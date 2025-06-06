const express = require('express');
const router = express.Router();
const authController = require('..//Controller/UserController');

// Sign-up route
router.post('/signup', authController.signup);
router.get('/signup', authController.getEmployee);
router.get('/employees', authController.getEmployee);

router.get('/employees/:id', authController.getEmployeeById);
router.delete('/employees/:id', authController.deleteEmployee);

router.put('/employees/:id', authController.updateEmployee);

// Login route
router.post('/login', authController.login);

// Protected profile route
router.get('/profile', authController.verifyToken, authController.profile);

module.exports = router;
