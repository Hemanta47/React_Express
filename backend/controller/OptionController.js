const Option = require("../model/OptionModel");

// GET : /api/options/
const getAllOption = async (req, res) => {
  try {
    const response = await Option.find();

    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

// POST : /api/options/create
const createOption = async (req, res) => {
  try {
    const data = req.body;

    const OptionData = new Option(data);
    await OptionData.save();
    res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

module.exports = {
  getAllOption,
  createOption,
};
