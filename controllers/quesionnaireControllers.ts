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
    isPublished: true,
    isLinkValid: true,
  });

  const createdQuestionnaire = await newQuestionnaire.save();
  res.status(201).json(createdQuestionnaire);
});

const publishQuestionnaire = asyncHandler(async (req: any, res) => {
  const questionnaire = await Quesionnaire.findById(req.params.id);
  const { title, description, isPublic, isPublished, isLinkValid, questions } =
    req.body;
  if (questionnaire) {
    questionnaire.title = title;
    questionnaire.description = description;
    questionnaire.isPublic = isPublic;
    questionnaire.isPublished = isPublished;
    questionnaire.isLinkValid = isLinkValid;
    questionnaire.questions = questions;
  }
  const updatedQuestionnaire = await questionnaire.save();
  res.status(201).json(updatedQuestionnaire);
});

export { createQuestionnaire, publishQuestionnaire };
