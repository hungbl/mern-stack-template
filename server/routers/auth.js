const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const userSchema = require('../models/user')

router.get('/', auth, async (req, res) => {
    try {
        const user = await userSchema.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({errors: [{message: 'Server Error'}]})
    }
})

router.post('/',
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    async (req, res) => {
        const error = validationResult(req)
        if(!error.isEmpty()) return res.status(400).json({errors: errors.array()})

        const {email, password} = req.body

        try {
            let user = await userSchema.findOne({email})
            if(!user) return res.status(400).json({errors: [{message: 'Invalid Credentials'}]})

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) return res.status(400).json({errors: [{message: 'Invalid Credentials'}]})

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

module.exports = router