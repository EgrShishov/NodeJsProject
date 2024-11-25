const Prescription = require('../models/Prescription');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { body, validationResult } = require('express-validator');

const validateCreatePrescription = [
    body('PatientId').notEmpty().withMessage('patientId обязателен'),
    body('DoctorId').notEmpty().withMessage('doctorId обязателен'),
    body('PrescriptionDate').notEmpty().withMessage('prescriptionDate обязателен').isDate().withMessage('prescriptionDate должен быть датой в формате YYYY-MM-DD'),
    body('Medication').notEmpty().withMessage('medication обязателен'),
    body('Dosage').notEmpty().withMessage('dosage обязателен'),
    body('Duration').notEmpty().withMessage('duration обязателен').isInt({min: 0}).withMessage('duration должно быть целым неотрицательным числом'),
];

exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.getAllPrescriptions();

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении рецептов' });
    }
};

exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.getPrescriptionById(req.params.id);

        if (!prescription) {
            return res.status(404).json({ message: 'Рецепт не найден' });
        }

        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении рецепта' });
    }
};

exports.createPrescription = [
    validateCreatePrescription,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({message: errors.array() });
    }
    try {
        const { DoctorId, PatientId, PrescriptionDate, Medication, Dosage, Duration } = req.body;

        const savedPrescription = await Prescription.prescribeMedication({
            DoctorId,
            PatientId,
            PrescriptionDate,
            Medication,
            Dosage,
            Duration
        });

        res.status(201).json(savedPrescription);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при создании рецепта: ${error.message}` });
    }
}];

exports.editPrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const updates = req.body;
        const rowsAffected = await Prescription.editPrescription(prescriptionId, updates);

        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Рецепт не найден' });
        }

        res.status(200).json(rowsAffected);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при редактировании рецепта' });
    }
};

exports.deletePrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const rowsAffected = await Prescription.deletePrescription(prescriptionId);

        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Рецепт не найден' });
        }

        res.status(200).json({ message: 'Рецепт успешно удалён' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении рецепта' });
    }
};

exports.getPatientPrescriptions = async (req, res) => {
    try {
        const prescription = await Prescription.getPrescriptionsByPatient(req.params.patientId);

        if (!prescription) {
            return res.status(404).json({ message: 'Рецепт не найден' });
        }

        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении рецепта: ${error.message}` });
    }
};