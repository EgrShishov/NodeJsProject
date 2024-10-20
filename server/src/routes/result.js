const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result');

router.get('/all', resultController.getAllResults);
router.get('/:id', resultController.getResultById);
router.post('/', resultController.createResult);
router.put('/:id', resultController.editResult);
router.delete('/:id', resultController.deleteResult);

module.exports = router;