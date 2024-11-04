const Patient = require('../models/Patient');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const validateCreatePatient = [
    body('userId').notEmpty().withMessage('userId обязателен'), //change according body params name
    body('firstName').isString().withMessage('firstName должен быть строкой').notEmpty().withMessage('firstName обязателен'),
    body('lastName').isString().withMessage('lastName должен быть строкой').notEmpty().withMessage('lastName обязателен'),
    body('middleName').optional().isString().withMessage('middleName должен быть строкой'),
    body('dateOfBirth').isDate().withMessage('dateOfBirth должен быть датой в формате YYYY-MM-DD')
];

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при получении пациентов: ${error.message}` });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findById(patientId)
            .populate('UserId', 'Email');

        if (!patient) {
            return res.status(404).json({ error: 'Пациент не найден' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при получении данных пациента: ${error.message}` });
    }
};

exports.createPatient = [validateCreatePatient,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userId, firstName, lastName, middleName, dateOfBirth } = req.body;
        const newPatient = new Patient({
            userId,
            firstName,
            lastName,
            middleName,
            dateOfBirth
        });

        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при создании пациента: ${error.message}` });
    }
}];

exports.editPatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const updates = req.body;
        const patient = await Patient.findByIdAndUpdate(patientId, updates, { new: true });

        if (!patient) {
            return res.status(404).json({ error: 'Пациент не найден' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при обновлении данных пациента: ${error.message}` });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findByIdAndDelete(patientId);

        if (!patient) {
            return res.status(404).json({ error: 'Пациент не найден' });
        }

        const user = await User.findById(patient.UserId);
        if (user) {

        }

        await user.deleteOne();

        res.status(200).json({ message: 'Пациент успешно удалён' });
    } catch (error) {
        res.status(500).json({ error: `Ошибка при удалении пациента: ${error.message}` });
    }
};
