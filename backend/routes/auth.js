const router = require('express').Router();

// Middleware Imports
const authenticate = require('../middleware/authentication');
const { validate, register_validation, login_validation } = require('../middleware/validation');

// Controller Imports
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const logout = require("../controllers/auth/logout");

// User Authentication Routes 
router.post('/register', register_validation, validate, register);
router.post('/login', login_validation, validate, login);
router.post('/logout', authenticate, logout);

module.exports = router;
