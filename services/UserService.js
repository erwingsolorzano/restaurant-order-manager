require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class UserService {
  async register(userData) {
    const { name, email, password } = userData;

    // Check for user existance
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('email already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Incorrect password');
    }

    // Generar el token
    // TODO: Configurar los roles de usuario
    const token = jwt.sign({ userId: user.id, email: user.email, role: 'admin' }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });

    return { user, token };
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }
}

module.exports = UserService;
