const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.post('/register', authController.registerUser);

router.get('/logout', ensureAuthenticated, authController.logout);

router.post('/login', authController.loginUser);

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['profile', 'email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

router.post('/refresh', authController.refreshToken);

module.exports = router;
