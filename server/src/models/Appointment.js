const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    PatientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    DoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    OfficeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Office' },
    ServiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    AppointmentDate: { type: Date, required: true },
    AppointmentTime: { type: String, required: true },
    IsApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Appointments', AppointmentSchema);