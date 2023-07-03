import asyncHandler from "express-async-handler";
import Quesionnaire from "../models/Quesionnaire";

const createQuesionnaire = asyncHandler(async (req: any, res) => {
  const { _id } = req.user;
  const { title, description, isPublic, questions } = req.body;

  const newQuesionnaire = new Quesionnaire({
    title,
    description,
    isPublic,
    questions,
    user: _id,
  });

  const createdQuesionnaire = await newQuesionnaire.save();
  res.status(201).json(createdQuesionnaire);
});

export { createQuesionnaire };
