const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PrescriptionSchema = new Schema({
    PatientId: { type: Schema.Types.ObjectId, ref: 'Patients' },
    DoctorId: { type: Schema.Types.ObjectId, ref: 'Doctors' },
    PrescriptionDate: { type: Date, default: Date.now },
    Medication: { type: String, required: true },
    Dosage: { type: String, required: true },
    Duration: { type: Number, required: true }
});

module.exports = mongoose.model('Prescriptions', PrescriptionSchema);