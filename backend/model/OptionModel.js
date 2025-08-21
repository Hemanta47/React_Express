const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Options = mongoose.model("Option", OptionSchema);
module.exports = Options;
