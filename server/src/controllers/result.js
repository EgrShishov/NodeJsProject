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
        const results = await Result.find()
            .populate('PatientId', 'FirstName LastName MiddleName')
            .populate('AppointmentId', 'AppointmentDate AppointmentTime IsApproved')
            .populate('DocumentId', 'FilePath DocumentType')
            .populate('DoctorId', 'FirstName LastName MiddleName');

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: `Error fetching results: ${error.message}` });
    }
};

exports.getResultById = async (req, res) => {
    try {
        const resultId = req.params.id;
        const results = await Result.find()
            .populate('PatientId', 'FirstName LastName MiddleName')
            .populate('AppointmentId', 'AppointmentDate AppointmentTime IsApproved')
            .populate('DocumentId', 'FilePath DocumentType')
            .populate('DoctorId', 'FirstName LastName MiddleName');

        if (!result) {
            return res.status(404).json({ error: 'Result not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: `Error fetching result: ${error.message}` });
    }
};

exports.createResult = [
    validateCreateResult,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { PatientId, DoctorId, AppointmentId, DocumentId, Complaints, Recommendations, Conclusion } = req.body;
        const resultFile = req.file ? req.file.path : null;

        const newDocument = new Document({
            FilePath: resultFile,
            DocumentType: req.file.mimetype
        });
        const savedDocument = newDocument.save();

        if (!savedDocument) return res.status(500).json({ error: `Error creating document: ${error.message}` });

        const newResult = new Result({
            PatientId,
            DoctorId,
            AppointmentId,
            DocumentId: newDocument._id,
            Complaints,
            Recommendations,
            Conclusion
        });

        const savedResult = await newResult.save();
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(500).json({ error: 'Error creating result' });
    }
}];

exports.editResult = async (req, res) => {
    try {
        const resultId = req.params.id;
        const updates = req.body;
        const updatedResult = await Result.findByIdAndUpdate(resultId, updates, { new: true });

        if (!updatedResult) {
            return res.status(404).json({ error: 'Result not found' });
        }

        res.status(200).json(updatedResult);
    } catch (error) {
        res.status(500).json({ error: 'Error updating result' });
    }
};

exports.deleteResult = async (req, res) => {
    try {
        const resultId = req.params.id;
        const result = await Result.findByIdAndDelete(resultId);

        if (!result) {
            return res.status(404).json({ error: 'Result not found' });
        }

        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting result' });
    }
};

exports.getResultByPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const result = await Result.find({ PatientId: patientId })
            .populate('PatientId', 'FirstName LastName MiddleName')
            .populate('AppointmentId', 'AppointmentDate AppointmentTime IsApproved')
            .populate('DocumentId', 'FilePath DocumentType')
            .populate('DoctorId', 'FirstName LastName MiddleName');

        if (!result) {
            return res.status(404).json({ error: 'Result not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: `Error fetching result: ${error.message}` });
    }
};
