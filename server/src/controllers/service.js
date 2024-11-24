const Service = require('../models/Service');
const { body, validationResult } = require('express-validator');

const validateCreateService = [
    body('serviceCategoryId').notEmpty().withMessage('patientId обязателен').isMongoId().withMessage('serviceCategoryId должен быть действительным ID'),
    body('serviceName').notEmpty().withMessage('serviceName обязателен'),
    body('isActive').notEmpty().withMessage('isActive обязателен').isBoolean().withMessage('isActive должен быть true or false'),
];


exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.getAllServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении услуг: ${error}` });
    }
};

exports.createService = [
    validateCreateService,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { serviceCategoryId, serviceName, isActive } = req.body;

        const newService = await Service.createService({
            service_category_id: serviceCategoryId,
            service_name: serviceName,
            is_active: isActive
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании услуги' });
    }
}];

exports.makeActive = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.editServiceStatus(serviceId, true);

        if (!service) {
            return res.status(404).json({ message: 'Услуга не найдена' });
        }

        res.status(200).json({ message: 'Услуга активирована', service });
    } catch (error) {
        res.status(500).json({ message: `Ошибка при активации услуги: ${error.message}` });
    }
}

exports.makeInActive = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.editServiceStatus(serviceId, false);

        if (!service) {
            return res.status(404).json({ message: 'Услуга не найдена' });
        }

        res.status(200).json({ message: 'Услуга деактивирована', service });
    } catch (error) {
        res.status(500).json({ message: `Ошибка при деактивации услуги: ${error.message}` });
    }
}

exports.deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.deleteService(serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Услуга не найдена' });
        }
        res.status(200).json({ message: 'Услуга удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении услуги' });
    }
};
