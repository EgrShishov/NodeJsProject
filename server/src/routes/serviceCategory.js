const express = require('express');
const router = express.Router();
const serviceCategoryController = require('../controllers/servicecategory');
const {ensureReceptionist} = require("../middleware/auth");

router.get('/all',  serviceCategoryController.getAllServiceCategories);
router.get('/:id', serviceCategoryController.getServiceCategoryById);
router.post('/', ensureReceptionist, serviceCategoryController.createServiceCategory);
router.put('/:id', ensureReceptionist, serviceCategoryController.editServiceCategory);
router.delete('/:id', ensureReceptionist, serviceCategoryController.deleteServiceCategory);

module.exports = router;
