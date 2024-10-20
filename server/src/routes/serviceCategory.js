const express = require('express');
const router = express.Router();
const serviceCategoryController = require('../controllers/servicecategory');

router.get('/all', serviceCategoryController.getAllServiceCategories);
router.get('/:id', serviceCategoryController.getServiceCategoryById);
router.post('/', serviceCategoryController.createServiceCategory);
router.put('/:id', serviceCategoryController.editServiceCategory);
router.delete('/:id', serviceCategoryController.deleteServiceCategory);

module.exports = router;
