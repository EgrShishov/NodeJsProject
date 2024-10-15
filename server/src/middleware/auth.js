module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated) return next();
        res.redirect('/login');
    },
    ensureGuest: (req, res, next) => {
        if (!req.isAuthenticated) return next();
        res.redirect('/');
    },
    ensureAdmin: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 'admin') return next();
        res.status(403).json({ message: 'Access denied' });
    },
    ensureSuperUser: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 'superuser') return next();
        res.status(403).json({ message: 'Access denied' });
    }
};