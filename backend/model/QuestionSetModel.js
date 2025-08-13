const mongoose = require("mongoose");

const QuestionSetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
      },
      choices: [
        {
          label: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
          correctAnswer: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const QuestionSet = mongoose.model("QuestionSet", QuestionSetSchema);
module.exports = QuestionSet;
