const Prescription = require('../models/Prescription');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { body, validationResult } = require('express-validator');

const validateCreatePrescription = [
    body('patientId').notEmpty().withMessage('patientId обязателен').isMongoId().withMessage('patientId должен быть действительным ID'),
    body('doctorId').notEmpty().withMessage('doctorId обязателен').isMongoId().withMessage('doctorId должен быть действительным ID'),
    body('prescriptionDate').notEmpty().withMessage('prescriptionDate обязателен').isDate().withMessage('prescriptionDate должен быть датой в формате YYYY-MM-DD'),
    body('medication').notEmpty().withMessage('medication обязателен'),
    body('dosage').notEmpty().withMessage('dosage обязателен'),
    body('duration').notEmpty().withMessage('duration обязателен').isInt({min: 0}).withMessage('duration должно быть целым неотрицательным числом'),
];

exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find()
            .populate('doctorId', 'firstName lastName')
            .populate('patientId', 'firstName lastName');

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении рецептов' });
    }
};

exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate('doctorId', 'firstName lastName')
            .populate('patientId', 'firstName lastName');

        if (!prescription) {
            return res.status(404).json({ error: 'Рецепт не найден' });
        }

        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении рецепта' });
    }
};

exports.createPrescription = [
    validateCreatePrescription,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try {
        const { doctorId, patientId, prescriptionDate, medication, dosage, duration } = req.body;

        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !patient) {
            return res.status(400).json({ error: 'Доктор или пациент не найдены' });
        }

        const newPrescription = new Prescription({
            doctorId,
            patientId,
            prescriptionDate,
            medication,
            dosage,
            duration
        });

        const savedPrescription = await newPrescription.save();
        res.status(201).json(savedPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании рецепта' });
    }
}];

exports.editPrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const updates = req.body;
        const updatedPrescription = await Prescription.findByIdAndUpdate(prescriptionId, updates, { new: true });

        if (!updatedPrescription) {
            return res.status(404).json({ error: 'Рецепт не найден' });
        }

        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при редактировании рецепта' });
    }
};

exports.deletePrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const prescription = await Prescription.findByIdAndDelete(prescriptionId);

        if (!prescription) {
            return res.status(404).json({ error: 'Рецепт не найден' });
        }

        res.status(200).json({ message: 'Рецепт успешно удалён' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении рецепта' });
    }
};

exports.getPatientPrescriptions = async (req, res) => {
    try {
        const prescription = await Prescription.find({ PatientId: req.params.patientId })
            .populate('doctorId', 'firstName lastName')
            .populate('patientId', 'firstName lastName');

        if (!prescription) {
            return res.status(404).json({ error: 'Рецепт не найден' });
        }

        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении рецепта' });
    }
};