const { Schema } = require('mongoose');

const PaymentSchema = new Schema({
    AppointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    Amount: { type: Number, required: true },
    UserId: { type: Schema.Types.ObjectId, ref: 'User' },
    PaymentDate: { type: Date, default: Date.now }
});

module.exports = PaymentSchema;