const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    RoleName: { type: String, unique: true, required: true }
});

module.exports = RoleSchema;