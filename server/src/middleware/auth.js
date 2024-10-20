module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated) return next();
        res.redirect('/login');
    },
    ensureGuest: (req, res, next) => {
        if (!req.isAuthenticated) return next();
        res.redirect('/');
    },
    ensurePatinet: (req, res, next) => {
        if (req.isAuthenticated && req.body.role === 'patient') return next();
        res.redirect('/');
    },
    ensureDoctor: (req, res, next) => {
        if (req.isAuthenticated && req.user.role === 'doctor') return next();
        res.redirect('/');
    },
    ensureReceptionist: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 'receptionist') return next();
        res.status(403).json({ message: 'Access denied' });
    },
    ensureSuperUser: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 'superuser') return next();
        res.status(403).json({ message: 'Access denied' });
    },
    ensureRole: (...roles) => {
        return (req, res, next) => {
            if (req.isAuthenticated() && roles.includes(req.user.role)) {
                return next();
            }
            return res.status(403).json({ message: 'Доступ запрещён ' });
        };
    },
};