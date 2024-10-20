const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const AppointmentProcedureSchema = new Schema({
    AppointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    ProcedureId: { type: Schema.Types.ObjectId, ref: 'MedicalProcedure' }
});

module.exports = mongoose.model('AppointmentProcedures', AppointmentProcedureSchema);