const MedicalProcedure = require('../models/MedicalProcedures');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Payment = require('../models/Payment');

exports.getAllProcedures = async (req, res) => {
    try {
        const procedures = await MedicalProcedure.find();

        res.status(200).json(procedures);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении процедур' });
    }
};

exports.getProcedureById = async (req, res) => {
    try {
        const procedure = await MedicalProcedure.findById(req.params.id);

        if (!procedure) {
            return res.status(404).json({ error: 'Процедура не найдена' });
        }

        res.status(200).json(procedure);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении процедуры' });
    }
};

exports.createProcedure = async (req, res) => {
    try {
        const { procedureName, description, procedureCost, doctorId, patientId, procedureDate, procedureTime } = req.body;

        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !patient) {
            return res.status(400).json({ error: 'Доктор или пациент не найдены' });
        }

        const newProcedure = new MedicalProcedure({
            procedureName,
            description,
            procedureCost,
            doctorId,
            patientId,
            procedureDate,
            procedureTime
        });

        const savedProcedure = await newProcedure.save();

        const newPayment = new Payment({
            AppointmentId: null,
            Amount: procedureCost,
            UserId: patientId,
            PaymentDate: new Date(),
        });
        const savedPayment = await newPayment.save();

        res.status(201).json(savedProcedure);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании процедуры' });
    }
};

exports.editProcedure = async (req, res) => {
    try {
        const procedureId = req.params.id;
        const updates = req.body;
        const updatedProcedure = await MedicalProcedure.findByIdAndUpdate(procedureId, updates, { new: true });

        if (!updatedProcedure) {
            return res.status(404).json({ error: 'Процедура не найдена' });
        }

        res.status(200).json(updatedProcedure);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при редактировании процедуры' });
    }
};

exports.deleteProcedure = async (req, res) => {
    try {
        const procedureId = req.params.id;
        const procedure = await MedicalProcedure.findByIdAndDelete(procedureId);

        if (!procedure) {
            return res.status(404).json({ error: 'Процедура не найдена' });
        }

        res.status(200).json({ message: 'Процедура успешно удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении процедуры' });
    }
};
