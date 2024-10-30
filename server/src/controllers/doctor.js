const Doctor = require('../models/Doctor');
const {SchemaTypes} = require("mongoose");

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate('SpecializationId', 'SpecializationName');

        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при получении врачей: ${error}` });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctorId = req.params.id;

        const doctor = await Doctor.findById(doctorId)
            .populate('SpecializationId', 'SpecializationName');

        if (!doctor) {
            return res.status(404).json({ error: 'Врач не найден' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при получении данных врача: ${error}` });
    }
};

exports.editDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const updates = req.body;

        const doctor = await Doctor.findByIdAndUpdate(doctorId, updates, { new: true });

        if (!doctor) {
            return res.status(404).json({ error: 'Врач не найден' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении данных врача' });
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const { userId, firstName, lastName, middleName, dateOfBirth, specializationId, careerStartYear } = req.body;

        const newDoctor = new Doctor({
            userId,
            firstName,
            lastName,
            middleName,
            dateOfBirth,
            specializationId,
            careerStartYear,
        });

        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании нового врача' });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findByIdAndDelete(doctorId);

        if (!doctor) {
            return res.status(404).json({ error: 'Врач не найден' });
        }

        res.status(200).json({ message: 'Врач успешно удалён' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении врача' });
    }
};