const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Log = require('../models/Log');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });
        if (user) return res.status(400).json({ message: 'User already exist' });

        user = new User({
            name,
            email,
            password
        });

        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, { expiresIn: accessTokenExpiry });
        const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, { expiresIn: refreshTokenExpiry });

        user.refreshToken = refreshToken;
        await user.save();

        await Log.create({ userId: user._id, action: 'User logged in' });

        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = async (req, res) => {
    await Log.create({ userId: user._id, action: 'User logout' });
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
                { userId: user._id },
                accessTokenSecret,
                { expiresIn: accessTokenExpiry }
            );
            Log.create({ userId: user._id, action: 'Access token refreshed' });
            res.status(200).json({ accessToken });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};