const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');

class MenuItemService {
  async createMenuItem(data) {
    return await MenuItem.create(data);
  }

  async getAllMenuItems() {
    return await MenuItem.findAll({
      where: { deleted: false },
      include: [Category],
    });
  }

  async getMenuItemById(id) {
    return await MenuItem.findByPk(id);
  }

  async updateMenuItem(id, data) {
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) return null;

    return await menuItem.update(data);
  }

  async deleteMenuItem(id) {
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      throw new Error('MenuItem not found');
    }
  
    menuItem.deleted = true;
    await menuItem.save();
    return menuItem;
  }  
}

module.exports = MenuItemService;
