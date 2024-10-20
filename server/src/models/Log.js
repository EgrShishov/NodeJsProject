const { Schema } = require('mongoose');

const LogSchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'User' },
    Action: { type: String, required: true },
    ActionDate: { type: Date, default: Date.now }
});

module.exports = LogSchema;