/*
const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PaymentSchema = new Schema({
    AppointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    Amount: { type: Number, required: true },
    PatientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
    PaymentDate: { type: Date, default: Date.now },
    IsFinished: { type: Boolean, default: false },
});

module.exports = mongoose.model('Payments', PaymentSchema);*/

const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/connection');
const Appointment = require('./Appointment');
const Invoice = require('./Invoice');

const Payment = sequelize.define('Payment', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    appointment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Appointment,
            key: 'appointment_id',
        },
    },
    amount: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Invoice,
            key: 'invoice_id',
        },
    },
    payment_date: {
        type: DataTypes.TIMESTAMP,
        allowNull: false,
    },
}, {
    tableName: 'Payments',
    timestamps: false,
});

Payment.belongsTo(Appointment, { foreignKey: 'appointment_id' });
Payment.belongsTo(Invoice, { foreignKey: 'invoice_id' });

module.exports = Payment;

