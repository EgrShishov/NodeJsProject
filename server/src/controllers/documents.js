const Document = require('../models/Document');

exports.getDocumentById = async (req, res) => {
    try {
        const documentId = req.params.id;
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching document' });
    }
};

exports.createDocument = async (req, res) => {
    try {
        const { documentType, filePath } = req.body;
        const newDocument = new Document({
            documentType,
            filePath
        });

        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
    } catch (error) {
        res.status(500).json({ error: 'Error creating document' });
    }
};

exports.editDocument = async (req, res) => {
    try {
        const documentId = req.params.id;
        const updates = req.body;
        const updatedDocument = await Document.findByIdAndUpdate(documentId, updates, { new: true });

        if (!updatedDocument) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ error: 'Error updating document' });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const documentId = req.params.id;
        const document = await Document.findByIdAndDelete(documentId);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting document' });
    }
};