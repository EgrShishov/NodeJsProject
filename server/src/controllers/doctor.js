const Doctor = require('../models/Doctor');
const {SchemaTypes} = require("mongoose");
const { body, validationResult } = require('express-validator');

const validateCreateDoctor = [
    body('userId').notEmpty().withMessage('userId обязателен'),
    body('firstName').isString().withMessage('firstName должен быть строкой').notEmpty().withMessage('firstName обязателен'),
    body('lastName').isString().withMessage('lastName должен быть строкой').notEmpty().withMessage('lastName обязателен'),
    body('middleName').optional().isString().withMessage('middleName должен быть строкой'),
    body('dateOfBirth').isDate().withMessage('dateOfBirth должен быть датой в формате YYYY-MM-DD'),
    body('careerStartYear').isInt({min: 1940, max: new Date().getFullYear()}).withMessage('careerStartYear должен быть числом неотрицательным'),
    body('specializationId').notEmpty().withMessage('specializationId обязателен')
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
        res.status(500).json({ error: 'Ошибка при обновлении данных врача' });
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
        const { userId, firstName, lastName, middleName, dateOfBirth, specializationId, careerStartYear } = req.body;

        const newDoctor = new Doctor({
            userId,
            firstName,
            lastName,
            middleName,
            dateOfBirth,
            specializationId,
            careerStartYear,
        });

        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании нового врача' });
    }
}];

exports.deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findByIdAndDelete(doctorId);

        if (!doctor) {
            return res.status(404).json({ error: 'Врач не найден' });
        }

        res.status(200).json({ message: 'Врач успешно удалён' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении врача' });
    }
};