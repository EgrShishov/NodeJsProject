const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.post('/register', async (req, res) => {
    const { name, email, paswsord } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exist' });

        user = new User({
            name,
            email,
            paswsord
        });

        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', passport.authenticate('local',{
    successRedirect: '/home',
    failureRedirect: 'login',
    failureFlash: true
}));

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

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
