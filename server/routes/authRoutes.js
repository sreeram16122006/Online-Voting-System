const express = require('express');
const router = express.Router();
const { register, studentLogin, adminLogin } = require('../controllers/authController');

router.post('/register', register);
router.post('/student-login', studentLogin);
router.post('/admin-login', adminLogin);

module.exports = router;