const CategoryService = require('../services/CategoryService');

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  async createCategory(req, res) {
    try {
      const category = await this.categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error creating category', error });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories', error });
    }
  }
}

module.exports = CategoryController;