const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ReceptionistSchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'User' },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    MiddleName: { type: String, required: true },
    DateOfBirth: { type: Date, required: true }
});

module.exports = mongoose.model('Receptionists', ReceptionistSchema);