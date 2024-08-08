const authorize = (req, res, next) => {
    try {
        if (req.role == "admin") {
            next()
        } else {
            return res.status(400).send(`you can't acess the route`)
        }
    } catch (error) {
        res.status(400).send(`error - ${error}`)
    }
}

module.exports = authorize