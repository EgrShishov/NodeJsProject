const MedicalProcedure = require('../models/MedicalProcedures');
const { body, validationResult } = require('express-validator');

const validateCreateProcedure = [
    body('procedureName').notEmpty().withMessage('procedureName обязателен'),
    body('description').notEmpty().withMessage('description обязателен'),
    body('procedureCost').notEmpty().withMessage('procedureCost обязателен').isFloat({min: 0.0001}).withMessage('procedureCost не может быть отрицательной')
];

exports.getAllProcedures = async (req, res) => {
    try {
        const procedures = await MedicalProcedure.find();

        res.status(200).json(procedures);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении процедур' });
    }
};

exports.getProcedureById = async (req, res) => {
    try {
        const procedure = await MedicalProcedure.findById(req.params.id);

        if (!procedure) {
            return res.status(404).json({ error: 'Процедура не найдена' });
        }

        res.status(200).json(procedure);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении процедуры' });
    }
};

exports.createProcedure = [
    validateCreateProcedure,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { procedureName, description, procedureCost } = req.body;

        const newProcedure = new MedicalProcedure({
            ProcedureName: procedureName,
            Description: description,
            ProcedureCost: procedureCost,
        });

        const savedProcedure = await newProcedure.save();
        res.status(201).json(savedProcedure);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при создании процедуры: ${error.message}` });
    }
}];

exports.editProcedure = async (req, res) => {
    try {
        const procedureId = req.params.id;
        const updates = req.body;
        const updatedProcedure = await MedicalProcedure.findByIdAndUpdate(procedureId, updates, { new: true });

        if (!updatedProcedure) {
            return res.status(404).json({ error: 'Процедура не найдена' });
        }

        res.status(200).json(updatedProcedure);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при редактировании процедуры' });
    }
};

exports.deleteProcedure = async (req, res) => {
    try {
        const procedureId = req.params.id;
        const procedure = await MedicalProcedure.findByIdAndDelete(procedureId);

        if (!procedure) {
            return res.status(404).json({ error: 'Процедура не найдена' });
        }

        res.status(200).json({ message: 'Процедура успешно удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении процедуры' });
    }
};
