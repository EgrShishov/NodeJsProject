const Payment = require('../models/Payment');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('patientId', 'FirstName SecondName LastName')
            .populate('appointmentId');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении платежей' });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('patientId', 'FirstName SecondName LastName')
            .populate('appointmentId');

        if (!payment) {
            return res.status(404).json({ error: 'Платеж не найден' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении платежа' });
    }
};

exports.createPayment = async (req, res) => {
    try {
        const { appointmentId, amount, userId, paymentDate } = req.body;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(400).json({ error: 'Назначение не найдено' });
        }

        const newPayment = new Payment({
            AppointmentId: appointmentId,
            Amount: amount,
            UserId: userId,
            PaymentDate: paymentDate
        });

        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании платежа' });
    }
};

exports.getPaymentHistory = async (req, res) => {
    try {
        const payment = await Payment.find({ PatientId: req.params.patientId })
            .populate('patientId', 'FirstName SecondName LastName')
            .populate('appointmentId');

        if (!payment) {
            return res.status(404).json({ error: 'Платеж не найден' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении платежа' });
    }
};

exports.getPatientPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ UserId: req.user._id, IsFinished: true });
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка в получении соевршенных платежей' });
    }
};

