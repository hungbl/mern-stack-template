const jwt = require('jsonwebtoken')

const auth = (req, res, callback) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401)
            .json({ message: 'token not found, authorization denied' })
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) return res.status(401)
                .json({ message: 'token invalid' })

            req.user = decoded.user
            callback()
        })
    } catch (error) {
        console.log(`something wrong with auth middleware ${error}`)
        res.status(500)
            .json({ message: `server error` })
    }
}

module.exports = auth