const passport = require('passport');
const Role = require('../models/Role');

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
        return async (req, res, next) => {
            const role = await Role.findById(req.user.roleId);
            if (!role) return res.status(404).json({ message: 'Роль не найдена' });

            if (!req.user) {
                return res.status(401).json({ message: 'Пользователь не авторизован' });
            }
            if (roles.includes(role.RoleName)) {
                return next();
            } else {
                return res.status(403).json({ message: 'Доступ запрещён: недостаточные права' });
            }
        };
    },
    auth: (req, res, next) => {
        let responseObj = {
            statusCode: 0,
            errorMsg: "",
            data: {}
        };

        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) return next(err);

            if (!user) {
                responseObj.data = info ? info.message : "No user found";
                responseObj.statusCode = 401;
                responseObj.errorMsg = "Unauthorized";
                return res.status(responseObj.statusCode).send(responseObj);
            }
            req.user = user;
            next();
        })(req, res, next);
    }
};