var express = require("express");
var router = express.Router();
const {
  getUser,
  createUser,
  Loginhandler,
} = require("../controller/UserController");

router.get("/", getUser);
router.post("/create", createUser);
router.post("/login", Loginhandler);

module.exports = router;
