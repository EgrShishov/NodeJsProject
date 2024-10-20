const Appointment = require('../models/Appointment');

exports.getAllAppointments = async (req, resp) => {
    try {
        const appointments = await Appointment.find()
            .populate('patientId', 'firstName lastName')
            .populate('doctorId', 'firstName lastName')
            .populate('serviceId', 'serviceName')
            .populate('officeId', 'city street');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении приёмов' });
    }
};

exports.createAppointment = async (req, res) => {
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
};

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