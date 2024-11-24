const MedicalProcedure = require('../models/MedicalProcedures');
const { body, validationResult } = require('express-validator');

const validateCreateProcedure = [
    body('procedureName').notEmpty().withMessage('procedureName обязателен'),
    body('description').notEmpty().withMessage('description обязателен'),
    body('procedureCost').notEmpty().withMessage('procedureCost обязателен').isFloat({min: 0.0001}).withMessage('procedureCost не может быть отрицательной')
];

exports.getAllProcedures = async (req, res) => {
    try {
        const procedures = await MedicalProcedure.getAllProcedures();
        res.status(200).json(procedures);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении процедур: ${error.message}` });
    }
};

exports.getProceduresByPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const procedures = await MedicalProcedure.getPatientsProcedures(patientId);
        res.status(200).json(procedures);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении процедур: ${error.message}` });
    }
};

exports.getProcedureById = async (req, res) => {
    try {
        const procedure = await MedicalProcedure.getProcedureById(req.params.id);

        if (!procedure) {
            return res.status(404).json({ message: 'Процедура не найдена' });
        }

        res.status(200).json(procedure);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении процедуры' });
    }
};

exports.createProcedure = [
    validateCreateProcedure,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { procedureName, description, procedureCost, serviceId } = req.body;

        const savedProcedure = await MedicalProcedure.createProcedure({
            procedure_name: procedureName,
            procedure_description: description,
            procedure_cost: procedureCost,
            service_id: serviceId
        });
        res.status(201).json(savedProcedure);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при создании процедуры: ${error.message}` });
    }
}];

exports.editProcedure = async (req, res) => {
    try {
        const procedureId = req.params.id;
        const updates = req.body;
        const updatedProcedure = await MedicalProcedure.editProcedure(procedureId, updates);

        if (!updatedProcedure) {
            return res.status(404).json({ message: 'Процедура не найдена' });
        }

        res.status(200).json(updatedProcedure);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при редактировании процедуры: ${error.message}` });
    }
};

exports.deleteProcedure = async (req, res) => {
    try {
        const procedureId = req.params.id;
        const procedure = await MedicalProcedure.deleteProcedure(procedureId);

        if (!procedure) {
            return res.status(404).json({ message: 'Процедура не найдена' });
        }

        res.status(200).json({ message: 'Процедура успешно удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении процедуры' });
    }
};
