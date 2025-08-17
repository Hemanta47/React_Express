const QuestionSet = require("../model/QuestionSetModel");

// api/admin/questionset/create - post
async function createQuestionSet(req, res) {
  try {
    const data = req.body;
    console.log(data);

    const { id } = req.user;

    const finalData = {
      ...data,
      createdBy: id,
    };

    const createSet = new QuestionSet(finalData);
    await createSet.save();

    res.status(201).json({
      message: "Question created",
      status: "success",
      data: createSet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      error,
    });
  }
}

module.exports = {
  createQuestionSet,
};
