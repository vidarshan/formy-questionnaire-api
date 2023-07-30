import mongoose, { Schema } from "mongoose";
import { uuid } from "uuidv4";

const optionSchema = new Schema<any>({
  _id: {
    type: String,
    default: uuid(),
  },
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const questionSchema = new Schema<any>(
  {
    _id: {
      type: String,
      default: uuid(),
    },
    title: { type: String, required: true },
    type: { type: String, required: true },
    values: { type: String, required: false },
    options: [optionSchema],
    answers: { type: String, default: null, required: false },
    required: { type: Boolean, default: false, required: false },
  },
  {
    timestamps: true,
  }
);

const answerSchema = new Schema<any>(
  {
    _id: {
      type: String,
      default: uuid(),
    },
    questionnaireId: { type: String, required: true },
    name: { type: String, required: false, default: "Anonymous" },
    email: { type: String, required: false, default: "Anonymous" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: { type: Schema.Types.Mixed },
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
    responses: [answerSchema],
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
