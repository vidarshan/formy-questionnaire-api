import asyncHandler from "express-async-handler";
import Quesionnaire from "../models/Quesionnaire";

const createQuestionnaire = asyncHandler(async (req: any, res) => {
  const { _id } = req.user;
  const { title, description, isPublic, questions } = req.body;

  const newQuestionnaire = new Quesionnaire({
    title,
    description,
    isPublic,
    questions,
    user: _id,
  });

  const createdQuestionnaire = await newQuestionnaire.save();
  res.status(201).json(createdQuestionnaire);
});

export { createQuestionnaire };
