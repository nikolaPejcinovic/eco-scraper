// Controllers
const articles = require("../controllers/article.js");

// Middleware
const { authJwt } = require("../middleware");

// Router
const router = require("express").Router();

router.get("/articles", authJwt.verifyToken, articles.findAll);
router.get("/articles/:id", authJwt.verifyToken, articles.findOne);

module.exports = router;
