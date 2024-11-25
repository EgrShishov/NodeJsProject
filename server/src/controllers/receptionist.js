const Receptionist = require('../models/Receptionist');
const { body, validationResult } = require('express-validator');
const transporter = require("../config/emailsender");

const validateCreateReceptionist = [
    body('first_name').isString().withMessage('firstName должен быть строкой').notEmpty().withMessage('firstName обязателен'),
    body('last_name').isString().withMessage('lastName должен быть строкой').notEmpty().withMessage('lastName обязателен'),
    body('middle_name').optional().isString().withMessage('middleName должен быть строкой'),
    body('date_of_birth').isDate().withMessage('dateOfBirth должен быть датой в формате YYYY-MM-DD'),
    body('email').isString().withMessage('email должен быть строкой').notEmpty().withMessage('email обязателен'),
];

exports.getAllReceptionists = async (req, res) => {
    try {
        const receptionists = await Receptionist.getAllReceptionists();
        res.status(200).json(receptionists);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении регистраторов: ${error.message}` });
    }
};

exports.getReceptionistById = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const receptionist = await Receptionist.getReceptionistById(receptionistId);

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

        const { email, first_name, last_name, middle_name, date_of_birth, phone_number } = req.body;

        const generatedPassword = Math.random().toString(36).slice(-8)
        const name = `${first_name} ${last_name} ${middle_name}`;
        const savedReceptionist = await Receptionist.createReceptionist({
            email,
            password: generatedPassword,
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            phone_number: phone_number,
            date_of_birth: date_of_birth
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

        try {
            await transporter.sendMail(mailOptions);
            res.status(201).json(savedReceptionist);
        } catch (error) {
            res.status(500).json({ message: "Registration successful, but email could not be sent." });
        }
    } catch (error) {
        res.status(500).json({ message: `Ошибка при создании регистратора: ${error.message}` });
    }
}];

exports.editReceptionist = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const updates = req.body;
        const rowsAffected = await Receptionist.editReceptionist(receptionistId, updates);

        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Регистратор не найден' });
        }

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: `Ошибка при обнволении данных регистратора: ${error.message}` });
    }
};

exports.deleteReceptionist = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const rowsAffected = await Receptionist.deleteReceptionist(receptionistId);

        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Регистратор не найден' });
        }
        res.status(200).json({ message: 'Регистратор успешно удалён' });
    } catch (error) {
        res.status(500).json({ message: `Ошибка при удалении регистратора: ${error.message}` });
    }
};
