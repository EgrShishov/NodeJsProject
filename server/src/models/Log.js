const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const LogSchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'User' },
    Action: { type: String, required: true },
    ActionDate: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Logs', LogSchema);