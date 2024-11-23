/*
const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    ServiceCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategories' },
    ServiceName: { type: String, required: true },
    IsActive: { type: Boolean, required: true }
});

module.exports = mongoose.model('Services', ServiceSchema);*/

const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/connection');
const ServiceCategory = require('./ServiceCategory');

const Service = sequelize.define('Service', {
    service_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    service_category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ServiceCategory,
            key: 'service_category_id',
        },
    },
    service_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'Services',
    timestamps: false,
});

Service.belongsTo(ServiceCategory, { foreignKey: 'service_category_id' });

module.exports = Service;

