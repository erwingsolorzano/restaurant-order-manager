const express = require('express');
const Role = require('../models/Role');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
  }
});

module.exports = router;
