const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();

router.get('/check-auth', authController.checkAuth);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
