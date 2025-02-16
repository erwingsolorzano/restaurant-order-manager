const MenuItemService = require('../services/MenuItemService');

class MenuItemController {
  constructor() {
    this.menuItemService = new MenuItemService();
  }

  async createMenuItem(req, res) {
    try {
      const menuItem = await this.menuItemService.createMenuItem(req.body);
      res.status(201).json(menuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error creating menu item', error });
    }
  }

  async getAllMenuItems(req, res) {
    try {
      const menuItems = await this.menuItemService.getAllMenuItems();
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching menu items', error });
    }
  }

  async getMenuItemById(req, res) {
    try {
      const menuItem = await this.menuItemService.getMenuItemById(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.json(menuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching menu item', error });
    }
  }

  async updateMenuItem(req, res) {
    try {
      const menuItem = await this.menuItemService.updateMenuItem(req.params.id, req.body);
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.json(menuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating menu item', error });
    }
  }

  async deleteMenuItem(req, res) {
    try {
      const success = await this.menuItemService.deleteMenuItem(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting menu item', error });
    }
  }
}

module.exports = MenuItemController;