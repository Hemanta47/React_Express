var express = require("express");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");
const { createQuestionSet } = require("../controller/adminController");
var router = express.Router();

router.post("/questionset/create", validateTokenMiddleware, createQuestionSet);

module.exports = router;
