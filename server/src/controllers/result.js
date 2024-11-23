const Result = require('../models/Result');
const Document = require('../models/Document');
const { body, validationResult } = require('express-validator');
const error = require("multer/lib/multer-error");

const validateCreateResult = [
    body('PatientId').notEmpty().withMessage('patientId обязателен').isMongoId().withMessage('patientId должен быть действительным ID'),
    body('DoctorId').notEmpty().withMessage('doctorId обязателен').isMongoId().withMessage('doctorId должен быть действительным ID'),
    body('AppointmentId').notEmpty().withMessage('appointmentId обязателен').isMongoId().withMessage('doctorId должен быть действительным ID'),
    body('Complaints').notEmpty().withMessage('complaints обязателен'),
    body('Recommendations').notEmpty().withMessage('recommendations обязателен'),
    body('Conclusion').notEmpty().withMessage('conclusion обязателен'),
];

exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.getAllResults();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: `Error fetching results: ${error.message}` });
    }
};

exports.getResultById = async (req, res) => {
    try {
        const resultId = req.params.id;
        const results = await Result.getResultById(resultId);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Error fetching result: ${error.message}` });
    }
};

exports.createResult = [
    validateCreateResult,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { PatientId, DoctorId, AppointmentId, DocumentId, Complaints, Recommendations, Conclusion } = req.body;
        const resultFile = req.file ? req.file.path : null;

        const savedResult = await Result.createResult({
            patient_id: PatientId,
            doctor_id: DoctorId,
            appointment_id: AppointmentId,
            document_type: req.file.mimetype || ' ',
            document_path: resultFile,
            complaints: Complaints,
            recommendations: Recommendations,
            conclusion: Conclusion
        });
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(500).json({ message: 'Error creating result' });
    }
}];

exports.editResult = async (req, res) => {
    try {
        const resultId = req.params.id;
        const updates = req.body;
        const updatedResult = await Result.editResult(resultId, updates);

        if (!updatedResult) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.status(200).json(updatedResult);
    } catch (error) {
        res.status(500).json({ message: 'Error updating result' });
    }
};

exports.deleteResult = async (req, res) => {
    try {
        const resultId = req.params.id;
        const result = await Result.deleteResult(resultId);

        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting result' });
    }
};

exports.getResultByPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const result = await Result.getResultsByPatient(patientId);

        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Error fetching result: ${error.message}` });
    }
};
