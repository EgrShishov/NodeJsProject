const Receptionist = require('../models/Receptionist');

exports.getAllReceptionists = async (req, res) => {
    try {
        const receptionists = await Receptionist.find().populate('userId', 'UserName Email');
        res.status(200).json(receptionists);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении регистраторов' });
    }
};

exports.getReceptionistById = async (req, res) => {
    try {
        const receptionistId = req.params.id;
        const receptionist = await Receptionist.findById(receptionistId).populate('userId', 'UserName Email');

        if (!receptionist) {
            return res.status(404).json({ error: 'Регистратор не найден' });
        }

        res.status(200).json(receptionist);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных регистратора' });
    }
};

exports.createReceptionist = async (req, res) => {
    try {
        const { userId, firstName, lastName, middleName, dateOfBirth } = req.body;
        const newReceptionist = new Receptionist({
            userId,
            firstName,
            lastName,
            middleName,
            dateOfBirth
        });

        const savedReceptionist = await newReceptionist.save();
        res.status(201).json(savedReceptionist);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании регистратора' });
    }
};

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
