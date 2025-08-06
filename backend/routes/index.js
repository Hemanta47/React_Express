var express = require("express");
var router = express.Router();
const { verifyUserController } = require("../controller/IndexController");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");

router.get("/api/verify/me", validateTokenMiddleware, verifyUserController);

module.exports = router;
