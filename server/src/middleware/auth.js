const passport = require('passport');
const Role = require('../models/Role');

module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated) return next();
        res.redirect('/login');
    },
    ensurePatinet: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');

            let role = await Role.findById(user.roleId);
            console.log(role, role.RoleName === 'patient', role.RoleName);
            if (role && role.RoleName === 'patient') return next();
            res.redirect('/auth/login');
        })(req, res, next);
    },
    ensureDoctor: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');

            let role = await Role.findById(user.roleId);
            if (role && role.RoleName === 'doctor') return next();
            res.redirect('/auth/login');
        })(req, res, next);
    },
    ensureReceptionist: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, async(err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');

            let role = await Role.findById(user.roleId);
            if (role && role.RoleName === 'receptionist') return next();
            res.redirect('/auth/login');
        })(req, res, next);
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