const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = async (req, res, next) => {
    try {

        const authHeader = req.headers;
        if (!authHeader.authorization) {
            return res.status(400).send('token not found')
        }

        const token = authHeader.authorization.split(" ")[1]

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).send('you are not authorized please login first')
            }
            if (decoded) {
                req.user = decoded;
                req.role = decoded.role
                return next()
            }
        })
    } catch (error) {
        res.status(400).send(`auth error - ${error}`)
    }
}

module.exports = auth