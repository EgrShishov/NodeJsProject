const mongoose = require('mongoose');

const OfficeSchema = mongoose.Schema({
    Country: { type: String, required: true },
    Region: { type: String, required: true },
    City: { type: String, required: true },
    Street: { type: String, required: true },
    StreetNumber: { type: Number, required: true },
    OfficeNumber: { type: Number, required: true },
    PhoneNumber: { type: String, required: true }
});

module.exports = OfficeSchema;