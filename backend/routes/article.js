const router = require('express').Router();

// Middleware Imports
const authenticate = require('../middleware/authentication');
const { authorize_author } = require('../middleware/authorization');
const { validate, article_creation_validation, article_update_validation } = require('../middleware/validation');

// Controller Import
const create_article = require("../controllers/article/create_article");
const delete_article = require("../controllers/article/delete_article");
const get_article = require("../controllers/article/get_article");
const get_articles = require("../controllers/article/get_articles");
const search_articles = require("../controllers/article/search_articles");
const update_article = require("../controllers/article/update_article");

// Article CRUD and Search Routes
router.get('/', get_articles);
router.get('/search', search_articles);
router.get('/:id', get_article);
router.post('/', authenticate, article_creation_validation, validate, create_article);
router.put('/:id', authenticate, authorize_author, article_update_validation, validate, update_article);
router.delete('/:id', authenticate, authorize_author, delete_article);

module.exports = router;
