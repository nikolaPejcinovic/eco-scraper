// Controllers
const { signup, signin } = require("../controllers/auth");

// Middleware
const { verifySignup } = require("../middleware");

// Router
const router = require("express").Router();

router.post("/signup", verifySignup.checkDuplicate, signup);
router.post("/signin", signin);

module.exports = router;
