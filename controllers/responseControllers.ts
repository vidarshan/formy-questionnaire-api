import asyncHandler from "express-async-handler";
import Quesionnaire from "../models/Quesionnaire";

const submitResponse = asyncHandler(async (req: any, res: any) => {
  const questionnaire = await Quesionnaire.findById(req.params.id);
  console.log(
    "🚀 ~ file: responseControllers.ts:6 ~ submitResponse ~ questionnaire:",
    questionnaire
  );
  const { questions } = req.body;

  const newResponse = {
    
  }
  
  if (questionnaire) {
    questionnaire.questions = questions;
  }

  // const updatedQuestionnaire = await questionnaire.save();
  // res.status(201).json(updatedQuestionnaire);
});

export { submitResponse };
