const Prescription = require('../models/Prescription');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find()
            .populate('doctorId', 'firstName lastName')
            .populate('patientId', 'firstName lastName');

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении рецептов' });
    }
};

exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate('doctorId', 'firstName lastName')
            .populate('patientId', 'firstName lastName');

        if (!prescription) {
            return res.status(404).json({ error: 'Рецепт не найден' });
        }

        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении рецепта' });
    }
};

exports.createPrescription = async (req, res) => {
    try {
        const { doctorId, patientId, prescriptionDate, medication, dosage, duration } = req.body;

        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !patient) {
            return res.status(400).json({ error: 'Доктор или пациент не найдены' });
        }

        const newPrescription = new Prescription({
            doctorId,
            patientId,
            prescriptionDate,
            medication,
            dosage,
            duration
        });

        const savedPrescription = await newPrescription.save();
        res.status(201).json(savedPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании рецепта' });
    }
};

exports.editPrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const updates = req.body;
        const updatedPrescription = await Prescription.findByIdAndUpdate(prescriptionId, updates, { new: true });

        if (!updatedPrescription) {
            return res.status(404).json({ error: 'Рецепт не найден' });
        }

        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при редактировании рецепта' });
    }
};

exports.deletePrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const prescription = await Prescription.findByIdAndDelete(prescriptionId);

        if (!prescription) {
            return res.status(404).json({ error: 'Рецепт не найден' });
        }

        res.status(200).json({ message: 'Рецепт успешно удалён' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении рецепта' });
    }
};