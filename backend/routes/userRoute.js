var express = require("express");
var router = express.Router();
const {
  getUserList,
  createUser,
  Loginhandler,
} = require("../controller/UserController");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");

router.get("/", validateTokenMiddleware, getUserList);
router.post("/create", createUser);
router.post("/login", Loginhandler);

module.exports = router;
