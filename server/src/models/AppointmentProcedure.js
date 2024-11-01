const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const AppointmentProcedureSchema = new Schema({
    AppointmentId: { type: Schema.Types.ObjectId, ref: 'Appointments' },
    ProcedureId: { type: Schema.Types.ObjectId, ref: 'MedicalProcedures' }
});

module.exports = mongoose.model('AppointmentProcedures', AppointmentProcedureSchema);