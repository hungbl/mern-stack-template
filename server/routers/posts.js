const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

const postSchema = require('../models/post')
const userSchema = require('../models/user')

router.post('/', auth,
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const user = await userSchema.findById(req.user.id).select('-password')

            const post = new postSchema({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            await post.save()

            res.json(post)
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

router.get('/', auth, async (req, res) => {
    try {
        const posts = postSchema.find().sort({ date: -1 });
        res.json({ posts });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await postSchema.findById(req.params.id)

        if (!post) return res.status(404).json({ message: 'Post not found' })

        res.json(post)

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await postSchema.findById(req.params.id)
        if (!post) return res.status(400).json({ message: 'Post not found' })

        if (post.user.id !== req.user.id) res.status(401).json({ message: 'User not authorized' })

        await post.remove();

        res.json({ message: 'Post removed' });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/like/:id', auth, async (req, res) => {
    try {
        let post = await postSchema.findById(req.params.id)
        if (!post) return res.status(400).json({ message: 'Post not found' })
        if(post.likes.some(like => like.user.toString() === req.user.id)) return res.status(400).json({ message: 'Post already liked' })

        post.likes.unshift({user: req.user.id})
        res.json(post.likes)
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        let post = await postSchema.findById(req.params.id)
        if (!post) return res.status(400).json({ message: 'Post not found' })
        if(!post.likes.some(like => like.user.toString() === req.user.id)) return res.status(400).json({ message: 'Post has not yet been liked' })

        post.likes = post.likes.filter(like => like.user.toString() === req.user.id)
        res.json(post.likes)
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/comment/:id', auth,
    check('text', 'Text is require').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const user = await userSchema.findById(req.user.id).select('-password')
            let post = await postSchema.findById(req.params.id)
            if (!post) return res.status(400).json({ message: 'Post not found' })

            const comment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }
            post.comments.unshift(comment)
            await post.save

            res.json(post.comments)
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({ message: 'Post not found' })

        const comment = post.comments.find((comment) => comment.id === req.params.comment_id);
        if (!comment) return res.status(404).json({ message: 'Comment does not exist' });
        if (comment.user.toString() !== req.user.id) return res.status(401).json({ message: 'User not a comment owner' });

        post.comments = post.comments.filter(comment => comment.id !== req.params.comment_id);
        await post.save();

        return res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
    });

module.exports = router;

