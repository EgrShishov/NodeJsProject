const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    PatientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients'},
    DoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctors' },
    OfficeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offices' },
    ServiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Services' },
    AppointmentDate: { type: Date, required: true },
    AppointmentTime: { type: String, required: true },
    IsApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Appointments', AppointmentSchema);