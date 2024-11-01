const express = require('express');
const router = express.Router();
const procedureController = require('../controllers/procedure');
const {ensureReceptionist, auth} = require("../middleware/auth");

router.get('/all', procedureController.getAllProcedures);
router.get('/:id', procedureController.getProcedureById);
router.post('/', auth, ensureReceptionist, procedureController.createProcedure);
router.put('/:id', auth, ensureReceptionist, procedureController.editProcedure);
router.delete('/:id', auth, ensureReceptionist, procedureController.deleteProcedure);

module.exports = router;