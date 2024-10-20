const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documents');
const { ensureAuthenticated, ensureGuest, ensurePatinet, ensureReceptionist, ensureRole, ensureDoctor} = require('../middleware/auth');

router.get('/:id', ensureRole('patient', 'doctor'), documentController.getDocumentById);
router.post('/', ensureDoctor, documentController.createDocument);
router.put('/:id', ensureDoctor, documentController.editDocument);
router.delete('/:id', ensureDoctor, documentController.deleteDocument);

module.exports = router;