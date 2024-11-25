const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Role = require('../models/Role');
const { body, validationResult } = require('express-validator');
const transporter = require('../config/emailsender');

const validateCreateDoctor = [
    body('email').isString().withMessage('email должен быть строкой').notEmpty().withMessage('email обязателен'),
    body('doctors_first_name').isString().withMessage('firstName должен быть строкой').notEmpty().withMessage('firstName обязателен'),
    body('doctors_last_name').isString().withMessage('lastName должен быть строкой').notEmpty().withMessage('lastName обязателен'),
    body('doctors_middle_name').optional().isString().withMessage('middleName должен быть строкой'),
    body('birthday_date').isDate().withMessage('dateOfBirth должен быть датой в формате YYYY-MM-DD'),
    body('career_start_year').isInt({min: 1940, max: new Date().getFullYear()}).withMessage('careerStartYear должен быть числом неотрицательным'),
    body('specializationId').isString().notEmpty().withMessage('specializationId обязателен')
];

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении врачей: ${error}` });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctorId = req.params.id;

        const doctor = await Doctor.getDoctorById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Врач не найден' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении данных врача: ${error}` });
    }
};

exports.editDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const updates = req.body;

        const doctor = await Doctor.editDoctor(doctorId, updates);

        if (!doctor) {
            return res.status(404).json({ message: 'Врач не найден' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при обновлении данных врача: ${error.message}` });
    }
};

exports.createDoctor = [
    validateCreateDoctor,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { email, doctors_first_name, doctors_last_name, doctors_middle_name, birthday_date, specializationId, career_start_year, phone_number } = req.body;

        const generatedPassword = Math.random().toString(36).slice(-8)

        const name = `${doctors_first_name} ${doctors_middle_name || ''} ${doctors_last_name} `;

        const savedDoctor = await Doctor.createDoctor({
            email: email,
            password: generatedPassword,
            first_name: doctors_first_name,
            last_name: doctors_last_name,
            middle_name: doctors_middle_name,
            phone_number: phone_number,
            date_of_birth: birthday_date,
            specialization_id: specializationId,
            career_start_year: career_start_year
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
            res.status(200).json(savedDoctor);
        } catch (error) {
            res.status(500).json({ message: "Registration successful, but email could not be sent." });
        }
    } catch (error) {
        res.status(500).json({ message: `Ошибка при создании нового врача: ${error.message}` });
    }
}];

exports.deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const rowsAffected = await Doctor.deleteDoctor(doctorId);
        if (rowsAffected === 0) {
            return res.status(404).json({message: `Врач ${doctorId} не найден`});
        }
        res.status(200).json({ message: 'Врач успешно удалён' });
    } catch (error) {
        res.status(500).json({ message: `Ошибка при удалении врача: ${error.message}` });
    }
};