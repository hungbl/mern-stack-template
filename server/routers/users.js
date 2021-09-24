const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const normalize = require('normalize-url')
const userSchema = require('../models/user')

router.post('/',
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password must include more than 6 characters').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400)
            .json({ errors: errors.array() })

        const { name, email, password } = req.body
        try {
            // let user = await userSchema.find({ $or:[ {email}, {name} ]})
            let user = await userSchema.findOne({ email })
            if (user) return res.status(400).json({ errors: [{ message: 'Email already exists' }] })

            user = await userSchema.findOne({ name })
            if (user) return res.status(400).json({ errors: [{ message: 'Username already exists' }] })

            const avatar = normalize(gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }), {forceHttps: true})
            user = new userSchema({ name, email, avatar, password })
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()

            const payload = { user: { id: user.id } }

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7 days' }, (error, token) => {
                if (error) throw error

                res.json({ token })
            })
        } catch (error) {
            console.error(error.message)
            res.status(500).json({errors: [{message: 'Server Error'}]})
        }
    })

router.get('/', auth, async (req, res) => {
    try {
        let user = await userSchema.findById(req.user.id)
        if(!user) return res.status(400).json({errors: [{message: 'User not found'}]})

        res.status(200).json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({errors: [{message: 'Server Error'}]})
    }
})

module.exports = router