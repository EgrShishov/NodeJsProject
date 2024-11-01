const User = require('../models/User');
const Receptionist = require('../models/Receptionist');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const {verify} = require("jsonwebtoken");
const mongoose = require("mongoose");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;

exports.registerUser = async (req, res) => {
    const { name, email, password, first_name, last_name, middle_name, date_of_birth } = req.body;

    try {
        let user = await User.findOne({ email: email });
        if (user) return res.status(400).json({ message: 'User already exist' });

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
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
};

exports.googleRegister = async (req, res) => {
    const { email, googleId, first_name, last_name, middle_name } = req.body

    try {
        let user = await User.findOne({ email: email });
        if (user) return res.status(400).json({ message: 'User already exist' });

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
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
};

exports.facebookRegister = async (req, res) => {
    const { email, facebookId, first_name, last_name, middle_name } = req.body

    try {
        let user = await User.findOne({ email: email });
        if (user) return res.status(400).json({ message: 'User already exist' });

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
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

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
        res.status(500).json({ message: `Server error: ${err}` });
    }
};

exports.logout = async (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(403).json({ message: 'Refresh token required' });

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(403).json({ message: 'Invalid refresh token' });

        jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });
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
        res.status(500).json({ message: 'Server error' });
    }
};

exports.profileInfo = async (req, res) => {
    const accessToken = req.cookies.access;
    if (!accessToken) {
        return res.status(500).json({ message: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(accessToken, accessTokenSecret);
        const userId = decoded._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const role = await Role.findById(user.roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

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
            return res.status(404).json({ message: 'Profile not created' });
        }

        return res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json({ message: `Server error: ${err.message}` });
    }
};