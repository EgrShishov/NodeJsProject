const Specialization = require('../models/Specialization');
const { body, validationResult } = require('express-validator');

const validateCreateSpecialization = [
    body('specializationName').notEmpty().withMessage('specializationName обязателен'),
];


exports.getAllSpecializations = async (req, res) => {
    try {
        const specializations = await Specialization.getAllSpecializations();
        res.status(200).json(specializations);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении специализаций' });
    }
};

exports.getSpecializationById = async (req, res) => {
    try {
        const specializationId = req.params.id;
        const specialization = await Specialization.getSpecializationById(specializationId);

        if (!specialization) {
            return res.status(404).json({ message: 'Специализация не найдена' });
        }

        res.status(200).json(specialization);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении специализации' });
    }
};

exports.createSpecialization = [
    validateCreateSpecialization,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { specializationName } = req.body;
        const savedSpecialization = await Specialization.createSpecialization({
            specialization_name: specializationName
        });
        res.status(201).json(savedSpecialization);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании специализации' });
    }
}];

exports.editSpecialization = async (req, res) => {
    try {
        const specializationId = req.params.id;
        const updates = req.body;
        const specialization = await Specialization.editSpecialization(specializationId, updates);

        if (!specialization) {
            return res.status(404).json({ message: 'Специализация не найдена' });
        }

        res.status(200).json(specialization);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при редактировании специализации' });
    }
};

exports.deleteSpecialization = async (req, res) => {
    try {
        const specializationId = req.params.id;
        const specialization = await Specialization.deleteSpecialization(specializationId);

        if (!specialization) {
            return res.status(404).json({ message: 'Специализация не найдена' });
        }

        res.status(200).json({ message: 'Специализация успешно удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении специализации' });
    }
};