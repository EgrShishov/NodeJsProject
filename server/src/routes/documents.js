const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documents');
const { ensureAuthenticated, ensureGuest, ensurePatinet, ensureReceptionist, ensureRole, ensureDoctor, auth} = require('../middleware/auth');

router.get('/:id', auth, ensureRole('patient', 'doctor'), documentController.getDocumentById);
router.post('/', auth, ensureDoctor, documentController.createDocument);
router.put('/:id', auth, ensureDoctor, documentController.editDocument);
router.delete('/:id', auth, ensureDoctor, documentController.deleteDocument);

module.exports = router;