const express = require('express');
const router = express.Router();
const serviceCategoryController = require('../controllers/servicecategory');
const {ensureReceptionist, auth} = require("../middleware/auth");
const passport = require('../config/passport');

router.get('/all',  serviceCategoryController.getAllServiceCategories);
router.get('/:id', serviceCategoryController.getServiceCategoryById);
router.post('/', auth, ensureReceptionist, serviceCategoryController.createServiceCategory);
router.put('/:id', auth, ensureReceptionist, serviceCategoryController.editServiceCategory);
router.delete('/:id', auth, ensureReceptionist, serviceCategoryController.deleteServiceCategory);

module.exports = router;
