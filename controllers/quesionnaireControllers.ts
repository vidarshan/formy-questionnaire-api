import asyncHandler from "express-async-handler";
import Quesionnaire from "../models/Quesionnaire";

const createQuestionnaire = asyncHandler(async (req: any, res) => {
  const { _id } = req.user;
  const { title, description, isPublic, isOneTime, questions } = req.body;

  const newQuestionnaire = new Quesionnaire({
    title,
    description,
    isPublic,
    questions,
    user: _id,
    isPublished: true,
    isLinkValid: true,
    isOneTime,
  });

  const createdQuestionnaire = await newQuestionnaire.save();
  res.status(201).json(createdQuestionnaire);
});

const editQuestionnaire = asyncHandler(async (req: any, res) => {
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

const deleteQuestionnaire = asyncHandler(async (req: any, res: any) => {
  const questionnaire = await Quesionnaire.findById(req.params.id);

  if (questionnaire) {
    await questionnaire.remove();
    res.json({ message: "Questionnaire removed" });
  } else {
    res.status(404);
    throw new Error("Questionnaire not found");
  }
});

export { createQuestionnaire, editQuestionnaire, deleteQuestionnaire };
