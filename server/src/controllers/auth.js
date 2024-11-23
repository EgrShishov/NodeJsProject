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
    const { email, password, first_name, last_name, middle_name, date_of_birth, phone_number } = req.body;

    try {
        let user = await User.getUserByEmail(email);
        if (user) return res.status(400).json({message: `User already exists`});

        let patientRole = await Role.getRoleByName('patient');

        const [userId, patientId] = await Patient.createPatient({
            email,
            password,
            first_name,
            last_name,
            middle_name,
            phone_number,
            date_of_birth
        })

        const accessToken = jwt.sign(
            { id: userId, role: patientRole.RoleName },
            accessTokenSecret,
            { expiresIn: accessTokenExpiry }
        );

        const refreshToken = jwt.sign(
            { id: userId },
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

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'None',
        });

        await User.setRefreshToken(userId, refreshToken);

        res.status(201).json({ message: 'User created' });
    } catch (err) {
        return res.status(401).json({message: `Unexpected server error: ${err.message}`});
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail({ email: email });
        if (!user) return res.status(404).json({message:'User not found'});

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({message: 'Invalid credentials'});

        const role = await Role.getRoleById(user.roleId);

        const accessToken = jwt.sign(
            { id: user.id, role: role.RoleName },
            accessTokenSecret,
            { expiresIn: accessTokenExpiry }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
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

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'None',
        });

        await User.setRefreshToken(user.id, refreshToken);

        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        return res.status(401).json({message: `Unexpected server error: ${err.message}`});
    }
};

exports.oauthLogin = async (req, res, next) => {
    const user = req.user;

    try {
        const role = await Role.getRoleById(user.roleId);
        if (!role) {
            return res.status(404).json({message: `Role not found`});
        }

        const accessToken = jwt.sign(
            { _id: user.id, role: role.RoleName },
            accessTokenSecret,
            { expiresIn: accessTokenExpiry }
        );

        const refreshToken = jwt.sign(
            { _id: user.id },
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

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'None',
        });

        await User.setRefreshToken(user.id, refreshToken);
        res.redirect(`http://localhost:5173/home`);
    } catch (err) {
        return res.status(500).json({message: `Unexpected server error: ${err.message}`});
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('access', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            path: '/',
            sameSite: 'None',
        });

        res.clearCookie('refresh', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'None',
        });

        req.logout(() => {
            res.status(200).json({ message: 'Logged out successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Unexpected error during logout' });
    }
};

exports.refreshToken = async (req, res, next) => {
    const { refresh } = req.cookies;
    if (!refresh) return res.status(403).json({message: `Refresh token required`});

    try {
        const user = await User.getUserByToken(refresh);
        if (!user) return res.status(403).json({message: `Invalid refresh token`});

        jwt.verify(refresh, refreshTokenSecret, (err, decoded) => {
            if (err) return res.status(403).json({message: `Invalid refresh token signature`});
            const accessToken = jwt.sign(
                { id: user.id },
                accessTokenSecret,
                { expiresIn: accessTokenExpiry }
            );

            const newRefreshToken = jwt.sign(
                { id: user.id },
                refreshTokenSecret,
                { expiresIn: refreshTokenExpiry }
            );

            User.setRefreshToken(user.id, newRefreshToken);

            res.cookie('access', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                path: '/',
                SameSite: 'None'
            });

            res.cookie('refresh', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/',
                sameSite: 'None',
            });

            res.status(200).json({ accessToken });
        });
    } catch (err) {
        return res.status(500).json({message: `Unexpected server error: ${err.message}`});
    }
};

exports.profileInfo = async (req, res, next) => {
    const accessToken = req.cookies.access;
    if (!accessToken) {
        return res.status(403).json({message: `Access token required`});
    }

    try {
        const decoded = jwt.verify(accessToken, accessTokenSecret);
        const userId = decoded.id;

        const user = await User.getUserById(userId);
        if (!user) return res.status(404).json({message: `User not found`});

        const role = await Role.getRoleById(user.roleId);
        if (!role) return res.status(404).json({message: `Role not found`});

        let profile = null;
        if (role.RoleName === 'receptionist') {
            const receptionist = await Receptionist.getReceptionistByUserId(userId)
                .populate('UserId', 'urlPhoto email');

            if (receptionist) {
                profile = receptionist.toObject();
                profile.role = 'receptionist';
            }
        } else if (role.RoleName === 'doctor') {
            const doctor = await Doctor.findOne({ UserId: userId })
                .populate('UserId', 'urlPhoto email');

            if (doctor) {
                profile = doctor.toObject();
                profile.role = 'doctor';
            }
        } else if (role.RoleName === 'patient') {
            const patient = await Patient.findOne({ UserId: userId })
                .populate('UserId', 'urlPhoto email');

            if (patient) {
                profile = patient.toObject();
                profile.role = 'patient';
            }
        }

        if (!profile) {
            return res.status(404).json({message: `Profile associated with this user not found`});
        }

        return res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json({message: `Server error: ${err.message}`});
    }
};

exports.updateProfileInfo = async (req, res, next) => {
    const accessToken = req.cookies.access;
    if (!accessToken) {
        return res.status(403).json({message: `Access token required`});
    }

    const { first_name, last_name, middle_name, date_of_birth, email, picture } = req.body

    const decoded = jwt.verify(accessToken, accessTokenSecret);
    const userId = decoded._id;

    try {
        const user = await User.findByIdAndUpdate(userId, {
            email, name: `${first_name} ${middle_name} ${last_name}`, urlPhoto: picture
        }, { new: true });

        console.log(user);
        let role = await Role.findById(user.roleId);
        let profile = null;
        const updates = {
            FirstName: first_name,
            LastName: last_name,
            MiddleName: middle_name,
            DateOfBirth: date_of_birth
        }

        if (role.RoleName === 'receptionist') {
            profile = await Receptionist.findOneAndUpdate({ UserId: user._id}, updates, {new: true})
                .populate('UserId', 'urlPhoto email');
        } else if (role.RoleName === 'doctor') {
            profile = await Doctor.findOneAndUpdate({ UserId: user._id}, updates, {new: true})
                .populate('UserId', 'urlPhoto email');
        } else if (role.RoleName === 'patient') {
            profile = await Patient.findOneAndUpdate({ UserId: user._id }, updates, {new: true})
                .populate('UserId', 'urlPhoto email');
        }

        res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json({message: `Unexpected server error: ${err.message}`});
    }
};