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

            let role = await Role.getRoleById(req.user.role_id);
            if (role && role.role_name === 'patient') return next();
            res.redirect('/auth/login');
        })(req, res, next);
    },
    ensureDoctor: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');

            let role = await Role.getRoleById(req.user.role_id);
            if (role && role.role_name === 'doctor') return next();
            res.redirect('/auth/login');
        })(req, res, next);
    },
    ensureReceptionist: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, async(err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');

            console.log('recept', user);
            let role = await Role.getRoleById(req.user.role_id);
            if (role && role.role_name === 'receptionist') return next();
            res.redirect('/auth/login');
        })(req, res, next);
    },
     ensureRole: (...roles) => {
        return async (req, res, next) => {
            let role = await Role.getRoleById(req.user.role_id);
            if (!role) return res.status(404).json({ message: 'Роль не найдена' });

            if (!req.user) {
                return res.status(401).json({ message: 'Пользователь не авторизован' });
            }
            if (roles.includes(role.role_name)) {
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

        try {
            passport.authenticate('jwt', {session: false}, (err, user, info) => {
                console.log(err);
                if (err) return next(err);

                if (!user) {
                    responseObj.data = info ? info.message : "No user found";
                    responseObj.statusCode = 401;
                    responseObj.errorMsg = "Unauthorized";
                    return res.status(responseObj.statusCode).send(responseObj);
                }
                console.log(user);
                req.user = user;
                next();
            })(req, res, next);
        } catch (error) {
            console.log(`Error occurred: ${error}`);
        }
    }
};