const mongoose = require('mongoose');

const SpecializationSchema = mongoose.Schema({
    SpecializationName: { type: String, required: true }
});

module.exports = mongoose.model('Specializations', SpecializationSchema);