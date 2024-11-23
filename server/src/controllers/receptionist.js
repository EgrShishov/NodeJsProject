const Receptionist = require('../models/Receptionist');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const transporter = require("../config/emailsender");
const Role = require("../models/Role");

const validateCreateReceptionist = [
    body('firstName').isString().withMessage('firstName должен быть строкой').notEmpty().withMessage('firstName обязателен'),
    body('lastName').isString().withMessage('lastName должен быть строкой').notEmpty().withMessage('lastName обязателен'),
    body('middleName').optional().isString().withMessage('middleName должен быть строкой'),
    body('dateOfBirth').isDate().withMessage('dateOfBirth должен быть датой в формате YYYY-MM-DD'),
    body('email').isString().withMessage('email должен быть строкой').notEmpty().withMessage('email обязателен'),
];

exports.getAllReceptionists = async (req, res) => {
    try {
        const receptionists = await Receptionist.find()
            .populate('UserId', 'name email urlPhoto');
        res.status(200).json(receptionists);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении регистраторов: ${error.message}` });
    }
};

exports.getReceptionistById = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const receptionist = await Receptionist.findById(receptionistId)
            .populate('UserId', 'name email urlPhoto');

        if (!receptionist) {
            return res.status(404).json({ message: 'Регистратор не найден' });
        }

        res.status(200).json(receptionist);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении данных регистратора: ${error.message}` });
    }
};

exports.createReceptionist = [
    validateCreateReceptionist,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        console.log(req.body);

        const { email, firstName, lastName, middleName, dateOfBirth } = req.body;

        const generatedPassword = Math.random().toString(36).slice(-8)

        const name = `${firstName} ${lastName} ${middleName}`;
        const receptionistRole = await Role.findOne({RoleName: 'receptionist'});
        const newUser = new User({
            name,
            email,
            password: generatedPassword,
            roleId: receptionistRole
        });

        console.log(newUser);

        const savedUser = await newUser.save();

        const newReceptionist = new Receptionist({
            UserId: savedUser._id,
            FirstName: firstName,
            LastName: lastName,
            MiddleName: middleName,
            DateOfBirth: dateOfBirth
        });

        const mailOptions = {
            from: `"AgendaClinic" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome to AgendaClinic - Your Credentials",
            html: `
            <h1>Welcome, ${name}!</h1>
            <p>Thank you for registering on our platform. Here are your login credentials:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${generatedPassword}</p>
            <p>Please keep this information safe.</p>
        `,
        };

        const savedReceptionist = await newReceptionist.save();

        try {
            await transporter.sendMail(mailOptions);
            res.status(201).json(savedReceptionist);
        } catch (error) {
            res.status(500).json({ message: "Registration successful, but email could not be sent." });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании регистратора' });
    }
}];

exports.editReceptionist = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const updates = req.body;
        const receptionist = await Receptionist.findByIdAndUpdate(receptionistId, updates, { new: true });

        if (!receptionist) {
            return res.status(404).json({ message: 'Регистратор не найден' });
        }

        res.status(200).json(receptionist);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при обнволении данных регистратора: ${error.message}` });
    }
};

exports.deleteReceptionist = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const receptionist = await Receptionist.findByIdAndDelete(receptionistId);

        if (!receptionist) {
            return res.status(404).json({ message: 'Регистратор не найден' });
        }

        await User.findByIdAndDelete(receptionist.UserId);

        res.status(200).json({ message: 'Регистратор успешно удалён' });
    } catch (error) {
        res.status(500).json({ message: `Ошибка при удалении регистратора: ${error.message}` });
    }
};
