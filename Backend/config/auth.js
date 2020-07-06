module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.send('Please Login , Status : '+req.isAuthenticated());
    }
}