const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const Patient = require('../models/Patient');
const passport = require('passport');
const { Types } = require('mongoose');
const Role = require('../models/Role');
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: './server/.env' });

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        req => req.cookies.access
    ]),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
};

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload._id });
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.error(err);
        return done(err, false);
    }
    })
);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleId: profile.id })
        .populate('roleId', ' urlPhoto email RoleName');
    if (user) return done(null, user);

    const role = await Role.findOne({RoleName: 'patient'});
    const newUser = new User({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        roleId: role._id,
        urlPhoto: profile.photos[0].value || `http://localhost:${process.env.PORT || 5000}/uploads/default-profile-image.png`,
    });
    user = await newUser.save();

    const firstName = profile.name.givenName || ' ';
    const lastName = profile.name.familyName || ' ';

    let dateOfBirth;
    if (profile.birthday){
        dateOfBirth = profile.birthday;
    }

    const newPatient = new Patient({
        UserId: user._id,
        FirstName: firstName || '',
        LastName: lastName || '',
        DateOfBirth: dateOfBirth || Date.now(),
    });

    console.log(newPatient);
    await newPatient.save();
    done(null, user);
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ facebookId: profile.id });
    if (existingUser) return done(null, existingUser);

    let patientRole = await Role.findOne({ RoleName: 'Patient' });

    if (!patientRole) {
        patientRole = new Role({ RoleName: 'Patient' });
        await patientRole.save();
        console.log('Role "Patient" created');
    }

    const newUser = new User({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
    });
    done(null, newUser);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((user, done) => {
    const foundUser = User.findById(user.id);
    if (foundUser) return done(null, user);
});

module.exports = passport;