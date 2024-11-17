const Receptionist = require('../models/Receptionist');
const { body, validationResult } = require('express-validator');

const validateCreateReceptionist = [
    body('userId').notEmpty().withMessage('userId обязателен'),
    body('firstName').isString().withMessage('firstName должен быть строкой').notEmpty().withMessage('firstName обязателен'),
    body('lastName').isString().withMessage('lastName должен быть строкой').notEmpty().withMessage('lastName обязателен'),
    body('middleName').optional().isString().withMessage('middleName должен быть строкой'),
    body('dateOfBirth').isDate().withMessage('dateOfBirth должен быть датой в формате YYYY-MM-DD')
];

exports.getAllReceptionists = async (req, res) => {
    try {
        const receptionists = await Receptionist.find().populate('userId', 'name email');
        res.status(200).json(receptionists);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении регистраторов' });
    }
};

exports.getReceptionistById = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const receptionist = await Receptionist.findById(receptionistId).populate('userId', 'name email');

        if (!receptionist) {
            return res.status(404).json({ error: 'Регистратор не найден' });
        }

        res.status(200).json(receptionist);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных регистратора' });
    }
};

exports.createReceptionist = [
    validateCreateReceptionist,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { userId, firstName, lastName, middleName, dateOfBirth } = req.body;
        const newReceptionist = new Receptionist({
            UserId: userId,
            FirstName: firstName,
            LastName: lastName,
            MiddleName: middleName,
            DateOfBirth: dateOfBirth
        });

        const savedReceptionist = await newReceptionist.save();
        res.status(201).json(savedReceptionist);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании регистратора' });
    }
}];

exports.editReceptionist = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const updates = req.body;
        const receptionist = await Receptionist.findByIdAndUpdate(receptionistId, updates, { new: true });

        if (!receptionist) {
            return res.status(404).json({ error: 'Регистратор не найден' });
        }

        res.status(200).json(receptionist);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении данных регистратора' });
    }
};

exports.deleteReceptionist = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const receptionist = await Receptionist.findByIdAndDelete(receptionistId);

        if (!receptionist) {
            return res.status(404).json({ error: 'Регистратор не найден' });
        }

        res.status(200).json({ message: 'Регистратор успешно удалён' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении регистратора' });
    }
};
