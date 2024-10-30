module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated) return next();
        res.redirect('/login');
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
    ensureRole: (...roles) => {
        return (req, res, next) => {
            console.log(req.user.role);
            return (req, res, next) => {
                if (req.isAuthenticated && req.isAuthenticated()) {
                    if (req.user && roles.includes(req.user.role)) {
                        return next();
                    } else {
                        return res.status(403).json({ message: `Доступ запрещён: недостаточные права` });
                    }
                }
                return res.status(401).json({ message: 'Пользователь не авторизован' });
            };
        };
    },
};