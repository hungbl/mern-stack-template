const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) return res.status(401).json({ message: 'Token not found, authorization denied' })

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) return res.status(401).json({ message: 'Token invalid' })

            req.user = decoded.user
            next()
        })
    } catch (error) {
        console.log(`Something wrong with auth middleware ${error}`)
        res.status(500).json({ message: `server error` })
    }
}

module.exports = auth