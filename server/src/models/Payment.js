const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PaymentSchema = new Schema({
    AppointmentId: { type: Schema.Types.ObjectId, ref: 'Appointments' },
    Amount: { type: Number, required: true },
    PatientId: { type: Schema.Types.ObjectId, ref: 'Patients' },
    PaymentDate: { type: Date, default: Date.now },
    IsFinished: { type: Boolean, default: false },
});

module.exports = mongoose.model('Payments', PaymentSchema);