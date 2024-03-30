import mongoose from "mongoose";

const schema = mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", 
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      choices: {
        type: [String],
        required: true,
        validate: (choices) => choices.length === 4,  
      },
      type: {
        type: String,
        enum: ["MCQs"],
        required: true,
      },
      correctAnswer: {
        type: Number,
        required: true,
        min: 0,
        max: 3,
      },
    },
  ],
});

export const Quiz = mongoose.model("Quiz", schema);
