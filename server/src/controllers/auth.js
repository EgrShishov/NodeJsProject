const User = require('../models/User');

exports.registerUser = async (req, res) => {
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
};

exports.logout = async (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};
