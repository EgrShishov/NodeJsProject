const ServiceCategory = require('../models/ServiceCategory');

exports.getAllServiceCategories = async (req, res) => {
    try {
        const categories = await ServiceCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении категорий услуг' });
    }
};

exports.getServiceCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await ServiceCategory.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Категория услуг не найдена' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении категории услуг' });
    }
};

exports.createServiceCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const newCategory = new ServiceCategory({
            categoryName
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании категории услуг' });
    }
};

exports.editServiceCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updates = req.body;
        const category = await ServiceCategory.findByIdAndUpdate(categoryId, updates, { new: true });

        if (!category) {
            return res.status(404).json({ error: 'Категория услуг не найдена' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при редактировании категории услуг' });
    }
};

exports.deleteServiceCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await ServiceCategory.findByIdAndDelete(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Категория услуг не найдена' });
        }

        res.status(200).json({ message: 'Категория услуг успешно удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении категории услуг' });
    }
};
