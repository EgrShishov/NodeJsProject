const Specialization = require('../models/Specialization');

exports.getAllSpecializations = async (req, res) => {
    try {
        const specializations = await Specialization.find();
        res.status(200).json(specializations);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении специализаций' });
    }
};

exports.getSpecializationById = async (req, res) => {
    try {
        const specializationId = req.params.id;
        const specialization = await Specialization.findById(specializationId);

        if (!specialization) {
            return res.status(404).json({ error: 'Специализация не найдена' });
        }

        res.status(200).json(specialization);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении специализации' });
    }
};

exports.createSpecialization = async (req, res) => {
    try {
        const { specializationName } = req.body;
        const newSpecialization = new Specialization({
            specializationName
        });

        const savedSpecialization = await newSpecialization.save();
        res.status(201).json(savedSpecialization);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании специализации' });
    }
};

exports.editSpecialization = async (req, res) => {
    try {
        const specializationId = req.params.id;
        const updates = req.body;
        const specialization = await Specialization.findByIdAndUpdate(specializationId, updates, { new: true });

        if (!specialization) {
            return res.status(404).json({ error: 'Специализация не найдена' });
        }

        res.status(200).json(specialization);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при редактировании специализации' });
    }
};

exports.deleteSpecialization = async (req, res) => {
    try {
        const specializationId = req.params.id;
        const specialization = await Specialization.findByIdAndDelete(specializationId);

        if (!specialization) {
            return res.status(404).json({ error: 'Специализация не найдена' });
        }

        res.status(200).json({ message: 'Специализация успешно удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении специализации' });
    }
};