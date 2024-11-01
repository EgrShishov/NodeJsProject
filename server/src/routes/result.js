const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result');
const {ensureRole, ensureDoctor, auth} = require("../middleware/auth");

router.get('/all', auth, ensureRole('doctor', 'receptionist'), resultController.getAllResults);
router.get('/:id', auth, ensureRole('doctor', 'patient', 'receptionist'), resultController.getResultById);
router.get('/:patientId', auth, ensureRole('doctor', 'patient'), resultController.getResultByPatient);
router.post('/', auth, ensureDoctor, resultController.createResult);
router.put('/:id', auth, ensureDoctor, resultController.editResult);
router.delete('/:id', auth, ensureDoctor, resultController.deleteResult);

module.exports = router;