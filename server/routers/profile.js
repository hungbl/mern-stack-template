const express = require('express')
const router = express.Router()
const axios = require('axios');
const { check, validationResult } = require('express-validator')
const { URL } = require('url')
const auth = require('../middleware/auth')

const profileSchema = require('../models/profile')
const userSchema = require('../models/user')

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await profileSchema.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])

        if (!profile) return res.status(400).json({ message: 'There is no profile for this user' })

        return res.json({ profile })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.post('/',
    auth,
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: [{ errors: errors.array() }] })

        const { website, skills, youtube, twitter, instagram, linkedin, facebook, ...rest } = req.body

        const profileFields = {
            user: req.user.id,
            website: website || '',
            skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => ` ${skill.trim()}`),
            sosial: { youtube, facebook, twitter, instagram, linkedin },
            ...rest
        }

        try {
            let profile = await profileSchema.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true, setDefaultOnInsert: true }
            )

            return res.json(profile)
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }

    })

router.get('/', async (req, res) => {
    try {
        const profiles = await profileSchema.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

router.get('/user/:user_id', async ({ params: { user_id } }, res) => {
    try {
        const profile = await profileSchema.findOne({ user: user_id }).populate('user', ['name', 'avatar'])

        if (!profile) return res.status(404).json({ message: 'Profile not found' })

        return res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        await Promise.all([
            profileSchema.findOneAndRemove({ user: req.user_id }),
            userSchema.findOneAndRemove({ _id: req.user_id })
        ])

        res.json({ message: '' })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.put('/experience',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Copany is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, { req }) => { req.body.to ? value < req.body.to : true }),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        try {
            let profile = await profileSchema.findOne({ user: req.user.id })
            if (!profile) return res.status(404).json({ message: 'Profile not found' })

            profile.experience.unshift(req.body);
            await profile.save()

            res.json(profile);
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    })

router.delete('experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await profileSchema.findOne({ user: req.user.id })
        if (!profile) return res.status(404).json({ message: 'Profile not found' })

        profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.exp_id)

        await profile.save();
        return res.status(200).json(profile);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.put('/education',
    auth,
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, {req}) => (req.body.to ? value < req.body.to : true)),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            let profile = await profileSchema.findOne({ user: req.user.id })
            if (!profile) return res.status(404).json({ message: 'Profile not found' })

            profile.education.unshift(req.body);
            await profile.save()

            res.json(profile);

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    })

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        let profile = await profileSchema.findOne({ user: req.user.id });
        if (!profile) return res.status(404).json({ message: 'Profile not found' })

        profile.education = profile.education.filter((edu) => edu._id.toString() !== req.params.edu_id);
        await profile.save();
        return res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
    })

router.get('/github/:username', async (req, res) => {
    try {
        const uri = encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        )
        const headers = {
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`
        }

        const gitHubResponse = await axios.get(uri, { headers })
        return res.json(gitHubResponse.data)
    } catch (err) {
        console.error(err.message)
        return res.status(404).json({ msg: 'No Github profile found' })
    }
    })

module.exports = router