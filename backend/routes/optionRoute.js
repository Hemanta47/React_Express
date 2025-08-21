const express = require("express");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");
const {
  getAllOption,
  createOption,
} = require("../controller/OptionController");
const router = express.Router();

router.get("/", validateTokenMiddleware, getAllOption);
router.post("/create", validateTokenMiddleware, createOption);

module.exports = router;
