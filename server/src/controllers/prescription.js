const Prescription = require('../models/Prescription');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { body, validationResult } = require('express-validator');

const validateCreatePrescription = [
    body('PatientId').notEmpty().withMessage('patientId обязателен').isMongoId().withMessage('patientId должен быть действительным ID'),
    body('DoctorId').notEmpty().withMessage('doctorId обязателен').isMongoId().withMessage('doctorId должен быть действительным ID'),
    body('PrescriptionDate').notEmpty().withMessage('prescriptionDate обязателен').isDate().withMessage('prescriptionDate должен быть датой в формате YYYY-MM-DD'),
    body('Medication').notEmpty().withMessage('medication обязателен'),
    body('Dosage').notEmpty().withMessage('dosage обязателен'),
    body('Duration').notEmpty().withMessage('duration обязателен').isInt({min: 0}).withMessage('duration должно быть целым неотрицательным числом'),
];

exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find()
            .populate('DoctorId', 'FirstName MiddleName LastName')
            .populate('PatientId', 'FirstName MiddleName LastName');

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении рецептов' });
    }
};

exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate('DoctorId', 'FirstName LastName')
            .populate('PatientId', 'FirstName LastName');

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
        const { DoctorId, PatientId, PrescriptionDate, Medication, Dosage, Duration } = req.body;

        const doctor = await Doctor.findById(DoctorId);
        const patient = await Patient.findById(PatientId);

        if (!doctor || !patient) {
            return res.status(400).json({ error: 'Доктор или пациент не найдены' });
        }

        const newPrescription = new Prescription({
            DoctorId,
            PatientId,
            PrescriptionDate,
            Medication,
            Dosage,
            Duration
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
            .populate('DoctorId', 'FirstName MiddleName LastName')
            .populate('PatientId', 'FirstName MiddleName LastName');

        if (!prescription) {
            return res.status(404).json({ error: 'Рецепт не найден' });
        }

        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при получении рецепта: ${error.message}` });
    }
};