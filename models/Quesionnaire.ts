import mongoose, { Schema } from "mongoose";
import { uuid } from "uuidv4";

const questionSchema = new Schema<any>(
  {
    _id: {
      type: String,
      default: uuid(),
    },
    title: { type: String, required: true },
    subtitle: { type: String, required: false },
    type: { type: String, required: true },
    content: { type: String, required: true },
    answer: { type: String, required: true },
    response: { type: String, default: null, required: false },
  },
  {
    timestamps: true,
  }
);

const quesionnaireSchema = new Schema<any>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isAuthRequired: {
      type: Boolean,
      required: false,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    isLinkValid: {
      type: Boolean,
      required: true,
    },
    questions: [questionSchema],
    participant: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Quesionnaire = mongoose.model("Quesionnaire", quesionnaireSchema);

export default Quesionnaire;
