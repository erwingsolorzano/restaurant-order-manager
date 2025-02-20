const UserService = require('../services/UserService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req, res) {
    try {
      const users = await this.userService.getUsers();
      res.status(201).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async register(req, res) {
    try {
      const user = await this.userService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.userService.login(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      // const { name, email, role } = req.body;
      const { id } = req.params;
      const user = await this.userService.updateUser(id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userService.deleteUser(id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;