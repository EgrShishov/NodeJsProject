const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

const passport = require('passport');
require('dotenv').config();

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (token, tokenSecret, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id });
        if (existingUser) return done(null, existingUser);

        const newUser = new User({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value
        });
        await newUser.save();
        done(null, newUser);
    }));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback'
    }, async (token, tokenSecret, profile, done) => {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) return done(null, existingUser);

        const newUser = new User({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value
        });
        await newUser.save();
        done(null, newUser);
    }));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((user, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}