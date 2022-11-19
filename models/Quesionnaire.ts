import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema<any>(
  {
    title: { type: String, required: true },
    subtitle: { type: Number, required: false },
    type: { type: String, required: true },
    content: { type: Object, required: true },
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
      unique: true,
    },
    isReversible: { questionSchema },
    questions: {
      type: Array,
      required: true,
    },
    isOnePage: {
      type: Boolean,
      required: true,
      default: false,
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
