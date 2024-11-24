const ServiceCategory = require('../models/ServiceCategory');
const { body, validationResult } = require('express-validator');

const validateCreateServiceCategory = [
    body('categoryName').notEmpty().withMessage('categoryName обязателен'),
];

exports.getAllServiceCategories = async (req, res) => {
    try {
        const categories = await ServiceCategory.getAllServiceCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении категорий услуг' });
    }
};

exports.getServiceCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await ServiceCategory.getServiceCategoryById(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Категория услуг не найдена' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении категории услуг' });
    }
};

exports.createServiceCategory = [
    validateCreateServiceCategory,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { categoryName } = req.body;
        const newCategory = await ServiceCategory.createServiceCategory({
            category_name: categoryName
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании категории услуг' });
    }
}];

exports.editServiceCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updates = req.body;
        const category = await ServiceCategory.editServiceCategory(categoryId, updates);

        if (!category) {
            return res.status(404).json({ message: 'Категория услуг не найдена' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при редактировании категории услуг' });
    }
};

exports.deleteServiceCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await ServiceCategory.deleteServiceCategory(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Категория услуг не найдена' });
        }

        res.status(200).json({ message: 'Категория услуг успешно удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении категории услуг' });
    }
};
