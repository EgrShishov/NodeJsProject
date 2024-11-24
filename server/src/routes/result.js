const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result');
const {ensureRole, ensureDoctor, auth} = require("../middleware/auth");
const upload = require("../middleware/fileUploads");
const passport = require('../config/passport');

router.get('/all', auth, ensureRole('doctor', 'receptionist'), resultController.getAllResults);
router.get('/:id', auth, ensureRole('doctor', 'patient', 'receptionist'), resultController.getResultById);
router.get('/by-patient/:patientId', auth, ensureRole('doctor', 'patient'), resultController.getResultByPatient);
router.post('/', auth, ensureDoctor, upload.single('file'),  resultController.createResult);
router.put('/:id', auth, ensureDoctor, resultController.editResult);
router.delete('/:id', auth, ensureDoctor, resultController.deleteResult);

module.exports = router;