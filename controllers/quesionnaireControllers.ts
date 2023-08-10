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
    isPublished: false,
    isLinkValid: false,
    isOneTime,
  });

  const createdQuestionnaire = await newQuestionnaire.save();
  res.status(201).json(createdQuestionnaire);
});

const editQuestionnaire = asyncHandler(async (req: any, res) => {
  const questionnaire = await Quesionnaire.findById(req.params.id);
  const mutableQuestions = questionnaire.questions;
  mutableQuestions.push(req.body.questions[0]);
  const { title, description, isPublic, isPublished, isLinkValid } = req.body;
  if (questionnaire) {
    questionnaire.title = title;
    questionnaire.description = description;
    questionnaire.isPublic = isPublic;
    questionnaire.isPublished = isPublished;
    questionnaire.isLinkValid = isLinkValid;
    questionnaire.questions = mutableQuestions;
  }
  const updatedQuestionnaire = await questionnaire.save();
  res.status(201).json(updatedQuestionnaire);
});

const publishQuestionnaire = asyncHandler(async (req: any, res) => {
  const questionnaire = await Quesionnaire.findById(req.params.id);
  if (questionnaire) {
    questionnaire.isPublished = true;
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

const getQuestionnaire = asyncHandler(async (req: any, res: any) => {
  const questionnaire = await Quesionnaire.findById(req.params.id);
  if (req.route.path.includes("/open/")) {
    if (questionnaire.isPublic) {
      if (questionnaire) {
        res.json(questionnaire);
      } else {
        res.status(404);
        throw new Error("Questionnaire not found");
      }
    } else {
      res.status(404);
      throw new Error("Questionnaire not accessible");
    }
  } else {
    if (questionnaire) {
      res.json(questionnaire);
    } else {
      res.status(404);
      throw new Error("Questionnaire not found");
    }
  }
});

const getAllQuestionnaires = asyncHandler(async (req: any, res: any) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Quesionnaire.countDocuments({ ...keyword });
  const questionnaires = await Quesionnaire.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    questionnaires,
    page,
    pages: Math.ceil(count / pageSize),
    keyword,
  });
});

const getAllQuestionnairesStats = asyncHandler(async (req: any, res: any) => {
  const published = (await Quesionnaire.find({ isPublished: true }))?.length;
  const unPublished = (await Quesionnaire.find({ isPublished: false }))?.length;
  const all = (await Quesionnaire.find())?.length;

  res.json({
    published,
    unPublished,
    all,
  });
});

const unPublishQuestionnaire = asyncHandler(async (req: any, res) => {
  const questionnaire = await Quesionnaire.findById(req.params.id);
  if (questionnaire) {
    questionnaire.isPublished = false;
  }
  const updatedQuestionnaire = await questionnaire.save();
  res.status(201).json(updatedQuestionnaire);
});

export {
  getQuestionnaire,
  getAllQuestionnaires,
  createQuestionnaire,
  editQuestionnaire,
  publishQuestionnaire,
  deleteQuestionnaire,
  getAllQuestionnairesStats,
  unPublishQuestionnaire,
};
