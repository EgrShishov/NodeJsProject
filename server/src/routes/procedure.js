const express = require('express');
const router = express.Router();
const procedureController = require('../controllers/procedure');
const {ensureReceptionist} = require("../middleware/auth");

router.get('/all', procedureController.getAllProcedures);
router.get('/:id', procedureController.getProcedureById);
router.post('/', ensureReceptionist, procedureController.createProcedure);
router.put('/:id', ensureReceptionist, procedureController.editProcedure);
router.delete('/:id', ensureReceptionist, procedureController.deleteProcedure);

module.exports = router;