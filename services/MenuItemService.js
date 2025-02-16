const MenuItem = require('../models/MenuItem');

class MenuItemService {
  async createMenuItem(data) {
    return await MenuItem.create(data);
  }

  async getAllMenuItems() {
    return await MenuItem.findAll();
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
    if (!menuItem) return false;

    await menuItem.destroy();
    return true;
  }
}

module.exports = MenuItemService;
