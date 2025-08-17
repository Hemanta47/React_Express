var express = require("express");
var router = express.Router();
const {
  verifyUserController,
  getProfile,
} = require("../controller/indexController");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");

router.get("/api/verify/me", validateTokenMiddleware, verifyUserController);
router.get("/api/profile/me", validateTokenMiddleware, getProfile);

module.exports = router;
