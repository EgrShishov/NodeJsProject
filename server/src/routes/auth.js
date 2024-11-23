const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');
const router = express.Router();
const { ensureAuthenticated, auth} = require('../middleware/auth');
const { googleRegister } = require("../controllers/auth");

router.get('/profile', ensureAuthenticated, authController.profileInfo);

router.post('/profile/update', ensureAuthenticated, authController.updateProfileInfo);

router.post('/register', authController.registerUser);

router.post('/logout', ensureAuthenticated, authController.logout);

router.post('/login', authController.loginUser);

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
}), authController.oauthLogin);

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['profile', 'email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:5173/home',
    failureRedirect: 'http://localhost:5173/login'
}),  (req, res) => {
    res.redirect('/');
});

router.post('/refresh', authController.refreshToken);

module.exports = router;
