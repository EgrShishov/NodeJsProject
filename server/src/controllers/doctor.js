const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Role = require('../models/Role');
const {SchemaTypes} = require("mongoose");
const { body, validationResult } = require('express-validator');

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
        const doctors = await Doctor.find()
            .populate('SpecializationId', 'SpecializationName');

        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при получении врачей: ${error}` });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctorId = req.params.id;

        const doctor = await Doctor.findById(doctorId)
            .populate('SpecializationId', 'SpecializationName');

        if (!doctor) {
            return res.status(404).json({ error: 'Врач не найден' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при получении данных врача: ${error}` });
    }
};

exports.editDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const updates = req.body;

        const doctor = await Doctor.findByIdAndUpdate(doctorId, updates, { new: true });

        if (!doctor) {
            return res.status(404).json({ error: 'Врач не найден' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при обновлении данных врача: ${error.message}` });
    }
};

exports.createDoctor = [
    validateCreateDoctor,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        console.log(req.body);
        const {email, doctors_first_name, doctors_last_name, doctors_middle_name, birthday_date, specializationId, career_start_year } = req.body;

        const doctorsRole = await Role.findOne({RoleName: 'doctor'});
        const newUser = new User({
            name: `${doctors_first_name} ${doctors_last_name} ${doctors_middle_name}`,
            email: email,
            password: 'doctor123',
            roleId: doctorsRole
        });

        const savedUser = await newUser.save();

        const newDoctor = new Doctor({
            UserId: savedUser._id,
            FirstName: doctors_first_name,
            LastName: doctors_last_name,
            MiddleName: doctors_middle_name,
            DateOfBirth: birthday_date,
            SpecializationId: specializationId,
            CareerStartYear: career_start_year,
        });

        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при создании нового врача: ${error.message}` });
    }
}];

exports.deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findByIdAndDelete(doctorId);

        if (!doctor) {
            return res.status(404).json({ error: 'Врач не найден' });
        }

        const user = await User.findById(doctor.UserId);
        if (user) {
            await user.deleteOne();
        }

        res.status(200).json({ message: 'Врач успешно удалён' });
    } catch (error) {
        res.status(500).json({ error: `Ошибка при удалении врача: ${error.message}` });
    }
};