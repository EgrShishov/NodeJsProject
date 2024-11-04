const User = require('../models/User');
const Receptionist = require('../models/Receptionist');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const {verify} = require("jsonwebtoken");
const mongoose = require("mongoose");
const {ApiError} = require('../errors');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;

exports.registerUser = async (req, res, next) => {
    const { email, password, first_name, last_name, middle_name, date_of_birth } = req.body;
    const name = `${first_name} ${last_name} ${middle_name}`;

    try {
        let user = await User.findOne({ email: email });
        if (user) return next(new ApiError('User already exists', 400));

        let patientRole = await Role.findOne( {RoleName: 'patient' });

        user = new User({
            name: name,
            email: email,
            password: password,
            roleId: patientRole._id
        });

        await user.save();

        let patientProfile = new Patient({
            UserId: user._id,
            FirstName: first_name,
            LastName: last_name,
            MiddleName: middle_name,
            DateOfBirth: date_of_birth
        });

        await patientProfile.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        next(new ApiError(`Error in user creation: ${err.message}`, 500));
    }
};

exports.googleRegister = async (req, res, next) => {
    const { email, googleId, first_name, last_name, middle_name } = req.body

    try {
        let user = await User.findOne({ email: email });
        if (user) return next(new ApiError('User already exists', 400));

        let patientRole = await Role.findOne({ RoleName: 'patient' });

        user = new User({
            name: `${first_name} ${middle_name} ${last_name}`,
            email: email,
            roleId: patientRole._id,
            googleId: googleId
        });

        await user.save();

        let patientProfile = new Patient({
            UserId: user._id,
            FirstName: first_name,
            LastName: last_name,
            MiddleName: middle_name,
            DateOfBirth: new Date()
        });

        await patientProfile.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        next(new ApiError(`Server error: ${err.message}`, 500));
    }
};

exports.facebookRegister = async (req, res, next) => {
    const { email, facebookId, first_name, last_name, middle_name } = req.body

    try {
        let user = await User.findOne({ email: email });
        if (user) return next(new ApiError('User already exists', 400));

        let patientRole = await Role.findOne({ RoleName: 'patient' });

        user = new User({
            name: `${first_name} ${middle_name} ${last_name}`,
            email: email,
            roleId: patientRole._id,
            facebookId: facebookId
        });

        await user.save();

        let patientProfile = new Patient({
            UserId: user._id,
            FirstName: first_name,
            LastName: last_name,
            MiddleName: middle_name,
            DateOfBirth: new Date(),
        });

        await patientProfile.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        next(new ApiError(`Server error: ${err.message}`, 500));
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) return next(new ApiError('User not found', 404));

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return next(new ApiError('Invalid credentials', 401));

        const role = await Role.findOne({ _id: user.roleId });

        const accessToken = jwt.sign(
            { _id: user._id, role: role.RoleName },
            accessTokenSecret,
            { expiresIn: accessTokenExpiry }
        );

        const refreshToken = jwt.sign(
            { _id: user._id },
            refreshTokenSecret,
            { expiresIn: refreshTokenExpiry }
        );

        res.cookie('access', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            path: '/',
            SameSite: 'None'
        });

        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        next(new ApiError(`Server error: ${err.message}`, 500));
    }
};

exports.logout = async (req, res, next) => {
    req.logout(() => {
        res.redirect('/');
    });
};

exports.refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return next(new ApiError('Refresh token required', 403));

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) return next(new ApiError('Invalid refresh token', 403));

        jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
            if (err) return next(new ApiError('Invalid refresh token signature', 403));
            const accessToken = jwt.sign(
                { _id: user._id },
                accessTokenSecret,
                { expiresIn: accessTokenExpiry }
            );

            res.cookie('access', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                path: '/',
                SameSite: 'None'
            });

            res.status(200).json({ accessToken });
        });
    } catch (err) {
        next(new ApiError(`Server error: ${err.message}`, 500));
    }
};

exports.profileInfo = async (req, res, next) => {
    const accessToken = req.cookies.access;
    if (!accessToken) {
        return next(new ApiError('Access token required', 500));
    }

    try {
        const decoded = jwt.verify(accessToken, accessTokenSecret);
        const userId = decoded._id;

        const user = await User.findById(userId);
        if (!user) return next(new ApiError('User not found', 404));

        const role = await Role.findById(user.roleId);
        if (!role) return next(new ApiError('Role not found', 400));


        let profile = null;
        if (role.RoleName === 'receptionist') {
            const receptionist = await Receptionist.findOne({ UserId: userId });

            if (receptionist) {
                profile = receptionist.toObject();
                profile.role = 'receptionist';
            }
        } else if (role.RoleName === 'doctor') {
            const doctor = await Doctor.findOne({ UserId: userId });

            if (doctor) {
                profile = doctor.toObject();
                profile.role = 'doctor';
            }
        } else if (role.RoleName === 'patient') {
            const patient = await Patient.findOne({ UserId: userId });

            if (patient) {
                profile = patient.toObject();
                profile.role = 'patient';
            }
        }

        if (!profile) {
            return next(new ApiError('Profile not created', 500));
        }

        return res.status(200).json(profile);
    } catch (err) {
        next(new ApiError(`Server error: ${err.message}`, 500));
    }
};