const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const DoctorSchema = Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'User' },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    MiddleName: { type: String, required: true },
    DateOfBirth: { type: Date, required: true },
    SpecializationId: { type: Schema.Types.ObjectId, ref: 'Specializations' },
    CareerStartYear: { type: Number, required: true }
});

module.exports =  mongoose.model('Doctors', DoctorSchema);