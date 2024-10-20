const { Schema } = require('mongoose');

const MedicalProcedureSchema = new Schema({
    ProcedureName: { type: String, required: true },
    Description: { type: String, required: true },
    ProcedureCost: { type: Number, required: true },
    DoctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    PatientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
    ProcedureDate: { type: Date, required: true },
    ProcedureTime: { type: String, required: true }
});

module.exports = MedicalProcedureSchema;