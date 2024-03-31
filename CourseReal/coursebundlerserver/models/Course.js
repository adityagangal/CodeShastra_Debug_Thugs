import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title"],
  },

  description: {
    type: String,
    required: [true, "Please enter the description"],
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz", // Reference to the separate Quiz model
  },
  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],

  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  numOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: [true, "Enter the Course Creator name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);
