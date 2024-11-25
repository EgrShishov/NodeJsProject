const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
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
        const patients = await Patient.getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении пациентов: ${error.message}` });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.getPatientById(patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Пациент не найден' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении данных пациента: ${error.message}` });
    }
};

exports.getDoctorsPatients = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const patients = await Doctor.getDoctorsPatients(doctorId);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: `Ошибка в получении пациентов для врача: ${error.message}` });
    }
};

exports.createPatient = [validateCreatePatient,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const generatedPassword = Math.random().toString(36).slice(-8)

        const { email, phoneNumber, firstName, lastName, middleName, dateOfBirth } = req.body;
        const newPatient = await Patient.createPatient({
            email,
            generatedPassword,
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,
            phone_number: phoneNumber,
            date_of_birth: dateOfBirth
        });

        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при создании пациента: ${error.message}` });
    }
}];

exports.editPatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const updates = req.body;
        const patient = await Patient.editPatient(patientId, updates);

        if (!patient) {
            return res.status(404).json({ message: 'Пациент не найден' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при обновлении данных пациента: ${error.message}` });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        if (!patientId) return res.status(500).json({message: "patient id not provided"});
        const patient = await Patient.deletePatient(patientId);

        if (!patient) return res.status(404).json({ error: 'Пациент не найден' });

        await User.deleteAccount(patient.UserId);

        res.status(200).json({ message: 'Пациент успешно удалён' });
    } catch (error) {
        res.status(500).json({ message: `Ошибка при удалении пациента: ${error.message}` });
    }
};