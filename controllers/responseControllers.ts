import asyncHandler from "express-async-handler";
import Quesionnaire from "../models/Quesionnaire";

const getQuestionnaire = asyncHandler(async (req: any, res: any) => {
  const questionnaire = await Quesionnaire.findById(req.params.id);
  if (questionnaire.isPublished) {
    if (questionnaire) {
      res.json(questionnaire);
    } else {
      res.status(404);
      throw new Error("Questionnaire not found");
    }
  } else {
    res.status(403).json({ message: "Questionnaire Ended" });
  }
});

const answerQuestionnaire = asyncHandler(async (req: any, res: any) => {
  const questionnaires = await Quesionnaire.findById(req.body.questionnaireId);
  const mutableResponses = questionnaires.responses;
  mutableResponses.push(req.body);
  questionnaires.responses = mutableResponses;
  const updatedQuestionnaire = await questionnaires.save();
  res.status(201).json(updatedQuestionnaire);
});

export { getQuestionnaire, answerQuestionnaire };
