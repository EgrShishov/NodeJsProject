const { Schema } = require('mongoose');
const  mongoose = require('mongoose');

const ServiceCategorySchema = new Schema({
    CategoryName: { type: String, required: true }
});

module.exports = mongoose.model('ServiceCategories', ServiceCategorySchema);