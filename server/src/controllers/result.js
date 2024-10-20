const Result = require('../models/Result');

exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.find().populate('patientId doctorId appointmentId documentId');
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching results' });
    }
};

exports.getResultById = async (req, res) => {
    try {
        const resultId = req.params.id;
        const result = await Result.findById(resultId).populate('patientId doctorId appointmentId documentId');

        if (!result) {
            return res.status(404).json({ error: 'Result not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching result' });
    }
};

exports.createResult = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentId, documentId, complaints, recommendations, conclusion } = req.body;
        const newResult = new Result({
            patientId,
            doctorId,
            appointmentId,
            documentId,
            complaints,
            recommendations,
            conclusion
        });

        const savedResult = await newResult.save();
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(500).json({ error: 'Error creating result' });
    }
};

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
