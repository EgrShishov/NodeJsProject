const Office = require('../models/Office');
const { body, validationResult } = require('express-validator');

const validateCreateOffice = [
    body('country').notEmpty().withMessage('country обязателен'),
    body('region').notEmpty().withMessage('region обязателен'),
    body('city').notEmpty().withMessage('city обязателен'),
    body('street').notEmpty().withMessage('street обязателен'),
    body('streetNumber').notEmpty().withMessage('streetNumber обязателен'),
    body('officeNumber').notEmpty().withMessage('officeNumber обязателен'),
    body('phoneNumber').notEmpty().withMessage('phoneNumber обязателен')
        .matches(/^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/)
        .withMessage('phoneNumber должен быть задан в виде +375 (XX) XXX-XX-XX')
];

exports.getAllOffices = async (req, res) => {
    try {
        const offices = await Office.getAllOffices();
        res.status(200).json(offices);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении офисов: ${error.message}` });
    }
};

exports.getOfficeById = async (req, res) => {
    try {
        const officeId = req.params.id;
        const office = await Office.getOfficeById(officeId);

        if (!office) {
            return res.status(404).json({ message: 'Офис не найден' });
        }

        res.status(200).json(office);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении офиса: ${error.message}` });
    }
};

exports.createOffice = [
    validateCreateOffice,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const { country, region, city, street, streetNumber, officeNumber, phoneNumber } = req.body;
        const savedOffice = await Office.createOffice({
            country,
            region,
            city,
            street,
            streetNumber,
            officeNumber,
            phoneNumber
        });

        res.status(201).json(savedOffice);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при создании офиса: ${error.message}` });
    }
}];

exports.editOffice = async (req, res) => {
    try {
        const officeId = req.params.id;
        const updates = req.body;
        const office = await Office.findByIdAndUpdate(officeId, updates, { new: true });

        if (!office) {
            return res.status(404).json({ message: 'Офис не найден' });
        }

        res.status(200).json(office);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при редактировании офиса: ${error.message}` });
    }
};

exports.deleteOffice = async (req, res) => {
    try {
        const officeId = req.params.id;
        const office = await Office.findByIdAndDelete(officeId);

        if (!office) {
            return res.status(404).json({ message: 'Офис не найден' });
        }

        res.status(200).json({ message: 'Офис успешно удалён' });
    } catch (error) {
        res.status(500).json({ message: `Ошибка при удалении офиса: ${error.message}` });
    }
};
