const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require("node:path");

const UserSchema = new mongoose.Schema({
    googleId: { type: String },
    facebookId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' },
    urlPhoto: { type: String, default: `http://localhost:${process.env.PORT || 5000}/uploads/default-profile-image.png` },
});

UserSchema.pre('save', async function(next) {
   if (!this.isModified('password')) return next();
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

UserSchema.methods.comparePassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
