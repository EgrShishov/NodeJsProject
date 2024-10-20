const Patient = require('../models/Patient');

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate('userId', 'UserName Email');
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении пациентов' });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findById(patientId).populate('userId', 'UserName Email');

        if (!patient) {
            return res.status(404).json({ error: 'Пациент не найден' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных пациента' });
    }
};

exports.createPatient = async (req, res) => {
    try {
        const { userId, firstName, lastName, middleName, dateOfBirth } = req.body;
        const newPatient = new Patient({
            userId,
            firstName,
            lastName,
            middleName,
            dateOfBirth
        });

        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании пациента' });
    }
};

exports.editPatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const updates = req.body;
        const patient = await Patient.findByIdAndUpdate(patientId, updates, { new: true });

        if (!patient) {
            return res.status(404).json({ error: 'Пациент не найден' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении данных пациента' });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findByIdAndDelete(patientId);

        if (!patient) {
            return res.status(404).json({ error: 'Пациент не найден' });
        }

        res.status(200).json({ message: 'Пациент успешно удалён' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении пациента' });
    }
};
