const UserService = require('../services/UserService');

class UserController {
  constructor() {
    this.userService = new UserService();
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
}

module.exports = UserController;