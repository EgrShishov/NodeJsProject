/*const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: { type: String },
    facebookId: {type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date }
});

UserSchema.pre('save', async function(next) {
   if (!this.isModified('password')) return next();
   const salt = await bcrypt.getSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

module.exports = mongoose.model('User', UserSchema);*/

const Model = require('../orm/Model');

class User extends Model {
    constructor() {
        super(User.name);
    }

    validate(fields, values) {
        if (fields.length !== values.length) {
            throw new Error('Amount of values must be equal to amount of fields');
        }
        // todo
    }
}

module.exports = User;