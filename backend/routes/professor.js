var express = require("express");
const { createProfile, getProfile } = require("../controller/ProfileContoller");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");
var router = express.Router();

router.get("/profile/:id", validateTokenMiddleware, getProfile);
router.post("/profile/create", validateTokenMiddleware, createProfile);

module.exports = router;
