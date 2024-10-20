const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    MiddleName: { type: String, required: true },
    DateOfBirth: { type: Date, required: true },
    SpecializationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialization' },
    CareerStartYear: { types: Number, required: true }
});

module.exports = DoctorSchema;