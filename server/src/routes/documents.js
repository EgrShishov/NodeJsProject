const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documents');

router.get('/:id', documentController.getDocumentById);
router.post('/', documentController.createDocument);
router.put('/:id', documentController.editDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;