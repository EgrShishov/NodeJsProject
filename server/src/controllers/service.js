const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('serviceCategoryId', 'categoryName');
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении услуг' });
    }
};

exports.createService = async (req, res) => {
    try {
        const { serviceCategoryId, serviceName } = req.body;

        const newService = new Service({
            serviceCategoryId,
            serviceName
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании услуги' });
    }
};

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
