/*
const mongoose = require('mongoose');

const SpecializationSchema = mongoose.Schema({
    SpecializationName: { type: String, required: true }
});

module.exports = mongoose.model('Specializations', SpecializationSchema);*/

const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/connection');

const Specialization = sequelize.define('Specialization', {
    specialization_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    specialization_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Specializations',
    timestamps: false,
});

module.exports = Specialization;

