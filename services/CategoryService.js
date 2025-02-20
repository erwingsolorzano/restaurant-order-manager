const Category = require('../models/Category');

class CategoryService {
  async createCategory(data) {
    return await Category.create(data);
  }

  async getAllCategories() {
    return await Category.findAll();
  }

  async getCategoryById(id) {
    return await Category.findByPk(id);
  }

  async updateCategory(id, data) {
    const category = await Category.findByPk(id);
    if (!category) return null;

    return await category.update(data);
  }

  async deleteCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }
  
    category.deleted = true;
    await category.save();
    return category;
  }  
}

module.exports = CategoryService;
