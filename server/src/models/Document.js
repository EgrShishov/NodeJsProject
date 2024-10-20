const { Schema } = require('mongoose');

const DocumentSchema = Schema({
    DocumentType: { type: String, required: true },
    FilePath: { type: String, required: true }
});

module.exports = DocumentSchema;