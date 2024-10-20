const { Schema } = require('mongoose');

const ServiceCategorySchema = new Schema({
    CategoryName: { type: String, required: true }
});

module.exports = ServiceCategorySchema;