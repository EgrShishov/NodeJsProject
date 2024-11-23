const Document = require('../models/Document');
const {join} = require("node:path");

exports.getDocumentById = async (req, res) => {
    try {
        const documentId = req.params.id;
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document' });
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
        res.status(500).json({ message: 'Error creating document' });
    }
};

exports.editDocument = async (req, res) => {
    try {
        const documentId = req.params.id;
        const updates = req.body;
        const updatedDocument = await Document.findByIdAndUpdate(documentId, updates, { new: true });

        if (!updatedDocument) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document' });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const documentId = req.params.id;
        const document = await Document.findByIdAndDelete(documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document' });
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            res.status(404).json({ message: 'Document not found' });
        }

        const filePath = join(__dirname, '../../', document.FilePath);

        res.setHeader('Content-Type', document.DocumentType);
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(500).send('Error sending file');
            }
        });
    } catch (error) {
        res.status(500).json({ message: `Error in downloading file :${error.message}`});
    }
};