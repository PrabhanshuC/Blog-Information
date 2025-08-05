const express = require("express");
const router = express.Router();

// Middleware Import
const authenticate = require("../middlewares/authentication");

// Controller Imports
const get_profile = require("../controllers/user/get_profile");
const update_profile = require("../controllers/user/update_profile");
const delete_profile = require("../controllers/user/delete_profile");
const get_user_articles = require("../controllers/user/get_user_articles");

// User Profile Routes

// Handles GET /api/users/profile
router.get("/profile", authenticate, get_profile);

// Handles PUT /api/users/profile
router.put("/profile", authenticate, update_profile);

// Handles DELETE /api/users/profile
router.delete("/profile", authenticate, delete_profile);

// Handles GET /api/users/:id/articles
router.get("/:id/articles", authenticate, get_user_articles);

module.exports = router;
