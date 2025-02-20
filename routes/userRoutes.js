const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

const userController = new UserController();

router.get('/', (req, res) => userController.getUsers(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));
router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));

module.exports = router;
