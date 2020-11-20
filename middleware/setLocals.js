module.exports = () => {
    return async (req, res, next) => {
        res.locales.user = req.user
        res.locales.isLoggedIn = req.session.isLoggedIn;
        next()
    }
}