var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    name: "professor name",
    college: "islington college",
    tech: ["JavaScript", "Express", "React"],
  });
});

module.exports = router;
