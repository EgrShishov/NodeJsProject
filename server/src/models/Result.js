const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ResultSchema = Schema({
    PatientId: { type: Schema.Types.ObjectId, ref: 'Patients' },
    DoctorId: { type: Schema.Types.ObjectId, ref: 'Doctors' },
    AppointmentId : { type: Schema.Types.ObjectId, ref: 'Appointments' },
    DocumentId : { type: Schema.Types.ObjectId, ref: 'Documents' },
    Complaints: { type: String, required: true },
    Recommendations: { type: String, required: true },
    Conclusion: { type: String, required: true },
});

module.exports = mongoose.model('Results', ResultSchema);