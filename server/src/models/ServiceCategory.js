// const { Schema } = require('mongoose');
// const  mongoose = require('mongoose');
//
// const ServiceCategorySchema = new Schema({
//     CategoryName: { type: String, required: true }
// });
//
// module.exports = mongoose.model('ServiceCategories', ServiceCategorySchema);

const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/connection');

const ServiceCategory = sequelize.define('ServiceCategory', {
    service_category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'ServiceCategory',
    timestamps: false,
});

module.exports = ServiceCategory;
