const express = require('express');
const router = express.Router();
const procedureController = require('../controllers/procedure');

router.get('/all', procedureController.getAllProcedures);
router.get('/:id', procedureController.getProcedureById);
router.post('/', procedureController.createProcedure);
router.put('/:id', procedureController.editProcedure);
router.delete('/:id', procedureController.deleteProcedure);

module.exports = router;