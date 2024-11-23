const Appointment = require('../models/Appointment');
const { body, validationResult } = require('express-validator');

const validateCreateAppointment = [
    body('PatientId').notEmpty().withMessage('patientId обязателен').isMongoId().withMessage('patientId должен быть действительным ID'),
    body('DoctorId').notEmpty().withMessage('doctorId обязателен').isMongoId().withMessage('doctorId должен быть действительным ID'),
    body('OfficeId').notEmpty().withMessage('officeId обязателен').isMongoId().withMessage('officeId должен быть действительным ID'),
    body('ServiceId').notEmpty().withMessage('serviceId обязателен').isMongoId().withMessage('serviceId должен быть действительным ID'),
    body('AppointmentDate').notEmpty().withMessage('appointmentDate обязателен').isDate().withMessage('appointmentDate должен быть датой в формате YYYY-MM-DD'),
    body('AppointmentTime').notEmpty().withMessage('appointmentTime обязателен').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('appointmentTime должен быть временем в формате HH:mm')
];

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('PatientId', 'FirstName LastName MiddleName')
            .populate('DoctorId', 'FirstName LastName MiddleName')
            .populate('ServiceId', 'ServiceName')
            .populate('OfficeId', 'City Street');
        console.log(appointments);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при получении приёмов: ${error}` });
    }
};

exports.createAppointment = [
    validateCreateAppointment,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const { PatientId, DoctorId, OfficeId, ServiceId, AppointmentDate, AppointmentTime } = req.body;

        const newAppointment = new Appointment({
            PatientId,
            DoctorId,
            OfficeId,
            ServiceId,
            AppointmentDate,
            AppointmentTime
        });

        const savedAppointment = await newAppointment.save();
        console.log(savedAppointment);
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при создании приёма: ${error.message}` });
    }
}];

exports.approveAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Приём не найден' });
        }

        appointment.IsApproved = true;
        await appointment.save();
        res.status(200).json({ message: 'Приём подтверждён', appointment });
    } catch (error) {
        res.status(500).json({ message: `Ошибка при подтверждении приёма: ${error.message}` });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Приём не найден' });
        }

        appointment.IsApproved = false;
        await appointment.save();
        res.status(200).json({ message: 'Приём отменен', appointment })
    } catch (error) {
        res.status(500).json({ message: `Ошибка при отмене приёма: ${error.message}` })
    }
};

exports.getAppointmentsSchedule = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const appointments = await Appointment.find({ DoctorId: doctorId })
            .populate('PatientId', 'FirstName LastName')
            .populate('ServiceId', 'ServiceName')
            .populate('OfficeId', 'Country City Street StreetNumber PhoneNumber');

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({message: `Ошибка в получении расписания: ${error.message}`});
    }
};

exports.getPatientAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find({ PatientId: req.params.patientId })
            .populate('PatientId', 'FirstName LastName MiddleName')
            .populate('ServiceId', 'ServiceName')
            .populate('DoctorId', 'FirstName LastName MiddleName')
            .populate('OfficeId', 'Country City Street StreetNumber PhoneNumber');

        console.log(appointments);
        if (!appointments) return res.status(404).json({ message: `No founded appointments` });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: `Ошибка получения консультаций: ${err.message}`});
    }
};