const Service = require('../models/Service');
const { body, validationResult } = require('express-validator');

const validateCreateService = [
    body('serviceCategoryId').notEmpty().withMessage('patientId обязателен').isMongoId().withMessage('serviceCategoryId должен быть действительным ID'),
    body('serviceName').notEmpty().withMessage('serviceName обязателен'),
    body('isActive').notEmpty().withMessage('isActive обязателен').isBoolean().withMessage('isActive должен быть true or false'),
];


exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('ServiceCategory', 'CategoryName');
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при получении услуг: ${error}` });
    }
};

exports.createService = [
    validateCreateService,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { serviceCategoryId, serviceName, isActive } = req.body;

        const newService = new Service({
            ServiceCategoryId: serviceCategoryId,
            ServiceName: serviceName,
            IsActive: isActive
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании услуги' });
    }
}];

exports.makeActive = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ error: 'Услуга не найдена' });
        }

        service.isActive = true;
        await service.save();

        res.status(200).json({ message: 'Услуга активирована', service });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при активации услуги' });
    }
}

exports.makeInActive = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ error: 'Услуга не найдена' });
        }

        service.isActive = false;  // Услуга активна
        await service.save();

        res.status(200).json({ message: 'Услуга деактивирована', service });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при деактивации услуги' });
    }
}

exports.deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ error: 'Услуга не найдена' });
        }

        await Service.findByIdAndDelete(serviceId);
        res.status(200).json({ message: 'Услуга удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении услуги' });
    }
};
