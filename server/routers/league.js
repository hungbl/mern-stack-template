const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const leagueSchema = require('../models/league')

//get all league
router.get('/', async (req, res) => {
    try {
        let leagues = await leagueSchema.find()
        return res.status(200).json({leagues})
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ message: 'Server Error' }] })
    }
})

// get specific league by id
router.get('/:id', async(req, res) => {
    try {
        let league = await leagueSchema.findById(req.params.id)
        if(!league) return res.status(400).json({errors: [{message: 'League not found'}]})

        return res.status(200).json(league)
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ message: 'Server Error' }] })
    }
})

// insert or update
router.post('/',
    check('name', 'Name is required').notEmpty(),
    check('type.name', 'Type Name is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        const { name, type: { name }, ...rest } = req.body
        try {
            let league = await leagueSchema.findOne({ name })
            if (!league) return res.status(400).json({ errors: [{ message: 'league already exists' }] })

            const leagueFields = {
                name,
                code: name.toLowerCase().replace(' ', '-'),
                 type: {
                    name: type.name,
                    code: type.name.toLowerCase().replace(' ', '-')
                },
                ...rest
            }

            league = await leagueSchema.findOneAndUpdate(
                { name: name },
                { $set: leagueFields },
                { new: true, upsert: true, setDefaultOnInsert: true }
            )

            return res.status(200).json(league)
        } catch (error) {
            console.error(error);
            res.status(500).json({ errors: [{ message: 'Server Error' }] })
        }
    })

module.exports = router