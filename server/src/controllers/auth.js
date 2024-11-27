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
        console.log(user);
        if (user) return res.status(400).json({message: `User already exists`});

        let patientRole = await Role.getRoleByName('patient');

        const result = await Patient.createPatient({
            email,
            password,
            first_name,
            last_name,
            middle_name,
            phone_number,
            date_of_birth
        })

        console.log(result);

        const accessToken = jwt.sign(
            { id: result.user_id, role: patientRole.role_name },
            accessTokenSecret,
            { expiresIn: accessTokenExpiry }
        );

        const refreshToken = jwt.sign(
            { id: result.user_id },
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

        await User.setRefreshToken(result.user_id, refreshToken);

        res.status(201).json({ message: 'User created' });
    } catch (err) {
        return res.status(401).json({message: `Unexpected server error: ${err.message}`});
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user) return res.status(404).json({message:'User not found'});

        const result = await User.comparePassword(user.user_id, password);
        if (!result.compare_passwords) return res.status(401).json({message: 'Invalid credentials'});

        const role = await Role.getRoleById(user.role_id);

        console.log(role);
        const accessToken = jwt.sign(
            { id: user.user_id, role: role.role_name },
            accessTokenSecret,
            { expiresIn: accessTokenExpiry }
        );

        const refreshToken = jwt.sign(
            { id: user.user_id },
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

        await User.setRefreshToken(user.user_id, refreshToken);

        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        return res.status(401).json({message: `Unexpected server error: ${err.message}`});
    }
};

exports.oauthLogin = async (req, res, next) => {
    const user = req.user;

    try {
        const role = await Role.getRoleById(user.role_id);
        if (!role) {
            return res.status(404).json({message: `Role not found`});
        }

        const accessToken = jwt.sign(
            { id: user.user_id, role: role.role_name },
            accessTokenSecret,
            { expiresIn: accessTokenExpiry }
        );

        const refreshToken = jwt.sign(
            { id: user.user_id },
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

        await User.setRefreshToken(user.user_id, refreshToken);
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
                { id: user.user_id },
                accessTokenSecret,
                { expiresIn: accessTokenExpiry }
            );

            const newRefreshToken = jwt.sign(
                { id: user.user_id },
                refreshTokenSecret,
                { expiresIn: refreshTokenExpiry }
            );

            User.setRefreshToken(user.user_id, newRefreshToken);

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

        const role = await Role.getRoleById(user.role_id);
        if (!role) return res.status(404).json({message: `Role not found`});

        let profile = null;
        if (role.role_name === 'receptionist') {
            const receptionist = await Receptionist.getReceptionistByUserId(userId);
            if (receptionist) {
                profile = receptionist;
                profile.role = 'receptionist';
            }
        } else if (role.role_name === 'doctor') {
            const doctor = await Doctor.getDoctorByUserId(userId);
            if (doctor) {
                profile = doctor;
                profile.role = 'doctor';
            }
        } else if (role.role_name === 'patient') {
            const patient = await Patient.getPatientByUserId(userId);

            if (patient) {
                profile = patient;
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
    const userId = decoded.id;

    try {
        const body = {
            email: email, name: `${first_name} ${middle_name} ${last_name}`, urlPhoto: picture
        };
        console.log(userId, body)
        await User.updateUser(userId, body);

        const user = await User.getUserById(userId);
        console.log(user);
        let role = await Role.getRoleById(user.role_id);
        let profile = null;
        const updates = {
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            date_of_birth: date_of_birth
        }

        if (role.role_name === 'receptionist') {
            await Receptionist.editReceptionist(user.user_id, updates);
            profile = await Receptionist.getReceptionistByUserId(user.user_id);
        } else if (role.role_name === 'doctor') {
            await Doctor.editDoctor(user.user_id, updates);
            profile = await Doctor.getDoctorByUserId(user.user_id);
        } else if (role.role_name === 'patient') {
            await Patient.editPatient(user.user_id , updates);
            profile = await Patient.getPatientByUserId(user.user_id);
        }
        res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json({message: `Unexpected server error: ${err.message}`});
    }
};