import mongoose, { Schema } from "mongoose";
import { uuid } from "uuidv4";

const questionSchema = new Schema<any>(
  {
    _id: {
      type: String,
      default: uuid(),
    },
    title: { type: String, required: true },
    type: { type: String, required: true },
    values: { type: String, required: false },
    answers: { type: String,  default: null, required: false },
    response: { type: String, default: null, required: false },
    required: { type: Boolean, default: false, required: false },
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
    isOneTime: {
      type: Boolean,
      required: true,
    },
    questions: [questionSchema],
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
