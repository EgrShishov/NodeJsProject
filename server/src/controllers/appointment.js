const Appointment = require('../models/Appointment');
const { body, validationResult } = require('express-validator');

const validateCreateAppointment = [
    body('patientId').notEmpty().withMessage('patientId обязателен').isMongoId().withMessage('patientId должен быть действительным ID'),
    body('doctorId').notEmpty().withMessage('doctorId обязателен').isMongoId().withMessage('doctorId должен быть действительным ID'),
    body('officeId').notEmpty().withMessage('officeId обязателен').isMongoId().withMessage('officeId должен быть действительным ID'),
    body('serviceId').notEmpty().withMessage('serviceId обязателен').isMongoId().withMessage('serviceId должен быть действительным ID'),
    body('appointmentDate').notEmpty().withMessage('appointmentDate обязателен').isDate().withMessage('appointmentDate должен быть датой в формате YYYY-MM-DD'),
    body('appointmentTime').notEmpty().withMessage('appointmentTime обязателен').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('appointmentTime должен быть временем в формате HH:mm')
];

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('PatientId', 'FirstName LastName')
            .populate('DoctorId', 'FirstName LastName')
            .populate('ServiceId', 'ServiceName')
            .populate('OfficeId', 'City Street');
        console.log(appointments);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: `Ошибка при получении приёмов: ${error}` });
    }
};

exports.createAppointment = [
    validateCreateAppointment,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { patientId, doctorId, officeId, serviceId, appointmentDate, appointmentTime } = req.body;

        const newAppointment = new Appointment({
            patientId,
            doctorId,
            officeId,
            serviceId,
            appointmentDate,
            appointmentTime
        });

        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании приёма' });
    }
}];

exports.approveAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Приём не найден' });
        }

        appointment.isApproved = true;
        await appointment.save();
        res.status(200).json({ message: 'Приём подтверждён', appointment });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при подтверждении приёма' });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Приём не найден' });
        }

        appointment.isApproved = false;
        await appointment.save();
        res.status(200).json({ message: 'Приём отменен', appointment })
    } catch (error) {
        res.status(500).json({error: 'Ошибка при отмене приёма' })
    }
};

exports.getAppointmentsSchedule = async (req, res) => {
    try{
        const doctorId = req.params.doctorId;
        const appointments = Appointment.find({ DoctorId: doctorId });

        if (!appointments) {
            return res.status(404).json({ error: 'У врача нет расписания' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({error: 'Ошибка при получении расписания'});
    }
};

exports.getPatientAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find({ PatientId: req.patientId });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
};