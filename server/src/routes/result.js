const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result');
const {ensureRole, ensureDoctor} = require("../middleware/auth");

router.get('/all', ensureRole('doctor', 'receptionist'), resultController.getAllResults);
router.get('/:id', ensureRole('doctor', 'patient', 'receptionist'), resultController.getResultById);
router.get('/:patientId', ensureRole('doctor', 'patient'), resultController.getResultByPatient);
router.post('/', ensureDoctor, resultController.createResult);
router.put('/:id', ensureDoctor, resultController.editResult);
router.delete('/:id', ensureDoctor, resultController.deleteResult);

module.exports = router;