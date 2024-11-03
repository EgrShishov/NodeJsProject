const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ResultSchema = Schema({
    PatientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
    DoctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    AppointmentId : { type: Schema.Types.ObjectId, ref: 'Appointment' },
    DocumentId : { type: Schema.Types.ObjectId, ref: 'Document' },
    Complaints: { type: String, required: true },
    Recommendations: { type: String, required: true },
    Conclusion: { type: String, required: true },
});

module.exports = mongoose.model('Results', ResultSchema);