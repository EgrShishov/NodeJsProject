const Office = require('../models/Office');

exports.getAllOffices = async (req, res) => {
    try {
        const offices = await Office.find();
        res.status(200).json(offices);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении офисов' });
    }
};

exports.getOfficeById = async (req, res) => {
    try {
        const officeId = req.params.id;
        const office = await Office.findById(officeId);

        if (!office) {
            return res.status(404).json({ error: 'Офис не найден' });
        }

        res.status(200).json(office);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении офиса' });
    }
};

exports.createOffice = async (req, res) => {
    try {
        const { country, region, city, street, streetNumber, officeNumber, phoneNumber } = req.body;
        const newOffice = new Office({
            country,
            region,
            city,
            street,
            streetNumber,
            officeNumber,
            phoneNumber
        });

        const savedOffice = await newOffice.save();
        res.status(201).json(savedOffice);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании офиса' });
    }
};

exports.editOffice = async (req, res) => {
    try {
        const officeId = req.params.id;
        const updates = req.body;
        const office = await Office.findByIdAndUpdate(officeId, updates, { new: true });

        if (!office) {
            return res.status(404).json({ error: 'Офис не найден' });
        }

        res.status(200).json(office);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при редактировании офиса' });
    }
};

exports.deleteOffice = async (req, res) => {
    try {
        const officeId = req.params.id;
        const office = await Office.findByIdAndDelete(officeId);

        if (!office) {
            return res.status(404).json({ error: 'Офис не найден' });
        }

        res.status(200).json({ message: 'Офис успешно удалён' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении офиса' });
    }
};
