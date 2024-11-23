const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    ServiceCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategories' },
    ServiceName: { type: String, required: true },
    IsActive: { type: Boolean, required: true }
});

module.exports = mongoose.model('Services', ServiceSchema);