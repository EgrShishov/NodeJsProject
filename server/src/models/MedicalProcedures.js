const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const MedicalProcedureSchema = new Schema({
    ProcedureName: { type: String, required: true },
    Description: { type: String, required: true },
    ProcedureCost: { type: Number, required: true },
    ServiceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Services'},
});

module.exports =  mongoose.model('MedicalProcedures', MedicalProcedureSchema);