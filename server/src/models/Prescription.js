const { Schema } = require('mongoose');

const PrescriptionSchema = new Schema({
    PatientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
    DoctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    PrescriptionDate: { type: Date, default: Date.now },
    Medication: { type: String, required: true },
    Dosage: { type: String, required: true },
    Duration: { type: Number, required: true }
});

module.exports = PrescriptionSchema;