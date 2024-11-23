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
        const appointments = await Appointment.getAllAppointments();
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
        const { PatientId, DoctorId, OfficeId, ServiceId, AppointmentDate, ProcedureId, AppointmentTime } = req.body;

        const savedAppointment = await Appointment.createAppointment({
            patient_id: PatientId,
            doctor_id: DoctorId,
            office_id: OfficeId,
            service_id: ServiceId,
            appointment_date: AppointmentDate,
            appointment_time: AppointmentTime,
            procedure_id: ProcedureId
        });

        console.log(savedAppointment);
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: `Ошибка при создании приёма: ${error.message}` });
    }
}];

exports.approveAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.getAppointmentById(appointmentId);

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
        const appointment = await Appointment.cancelAppointment(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Приём не найден' });
        }
        res.status(200).json({ message: 'Приём отменен', appointment })
    } catch (error) {
        res.status(500).json({ message: `Ошибка при отмене приёма: ${error.message}` })
    }
};

exports.getAppointmentsSchedule = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const appointments = await Appointment.getDoctorsSchedule(doctorId);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({message: `Ошибка в получении расписания: ${error.message}`});
    }
};

exports.getPatientAppointment = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const appointments = await Appointment.getPatientAppointments(patientId);
        console.log(appointments);
        if (!appointments) return res.status(404).json({ message: `No founded appointments` });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: `Ошибка получения консультаций: ${err.message}`});
    }
};