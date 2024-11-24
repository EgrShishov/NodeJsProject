require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        req => req.cookies.access
    ]),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await User.getUserById(jwt_payload.id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }})
);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    let user = await User.getUserByGoogleId(profile.id);
    if (user) return done(null, user);

    const firstName = profile.name.givenName || ' ';
    const lastName = profile.name.familyName || ' ';

    let dateOfBirth;
    if (profile.birthday){
        dateOfBirth = profile.birthday;
    }

    const [user_id] = await Patient.createPatient({
        google_id: profile.id,
        email: profile.emails[0].value,
        first_name: firstName || '',
        last_name: lastName || '',
        date_of_birth: dateOfBirth || Date.now(),
    });

    user = await User.getUserById(user_id);

    done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.user_id));
passport.deserializeUser((user, done) => {
    const foundUser = User.getUserById(user.user_id);
    if (foundUser) return done(null, user);
});

module.exports = passport;