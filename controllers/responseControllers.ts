import asyncHandler from "express-async-handler";
import Quesionnaire from "../models/Quesionnaire";
import Paper from "../models/Response";

const submitResponse = asyncHandler(async (req: any, res: any) => {
  const { _id } = req.user;
  const questionnaire = await Quesionnaire.findById(req.params.id);
  const ifAnswered = await Paper.find({ questionnaireId: questionnaire._id });
  if (ifAnswered?.length > 0) {
    res.json({ message: "Questionnaire already answered" });
  } else {
    if (questionnaire) {
      const newPaper = {
        title: questionnaire.title,
        description: questionnaire.description,
        isAuthRequired: questionnaire.isAuthRequired,
        isPublic: questionnaire.isPublic,
        isPublished: questionnaire.isPublished,
        isLinkValid: questionnaire.isLinkValid,
        isOneTime: questionnaire.isOneTime,
        questions: questionnaire.questions,
        questionnaireId: questionnaire._id,
        user: _id,
      };
      const createdPaper = await Paper.create(newPaper);
      res.status(201).json(createdPaper);
    }
  }
});

export { submitResponse };
