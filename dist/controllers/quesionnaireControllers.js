"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerQuestionnaire = exports.deleteQuestionnaire = exports.publishQuestionnaire = exports.editQuestionnaire = exports.createQuestionnaire = exports.getAllQuestionnaires = exports.getQuestionnaire = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Quesionnaire_1 = __importDefault(require("../models/Quesionnaire"));
const createQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { title, description, isPublic, isOneTime, questions } = req.body;
    const newQuestionnaire = new Quesionnaire_1.default({
        title,
        description,
        isPublic,
        questions,
        user: _id,
        isPublished: false,
        isLinkValid: true,
        isOneTime,
    });
    const createdQuestionnaire = yield newQuestionnaire.save();
    res.status(201).json(createdQuestionnaire);
}));
exports.createQuestionnaire = createQuestionnaire;
const editQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaire = yield Quesionnaire_1.default.findById(req.params.id);
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
    const updatedQuestionnaire = yield questionnaire.save();
    res.status(201).json(updatedQuestionnaire);
}));
exports.editQuestionnaire = editQuestionnaire;
const publishQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaire = yield Quesionnaire_1.default.findById(req.params.id);
    if (questionnaire) {
        questionnaire.isPublished = true;
    }
    const updatedQuestionnaire = yield questionnaire.save();
    res.status(201).json(updatedQuestionnaire);
}));
exports.publishQuestionnaire = publishQuestionnaire;
const deleteQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaire = yield Quesionnaire_1.default.findById(req.params.id);
    if (questionnaire) {
        yield questionnaire.remove();
        res.json({ message: "Questionnaire removed" });
    }
    else {
        res.status(404);
        throw new Error("Questionnaire not found");
    }
}));
exports.deleteQuestionnaire = deleteQuestionnaire;
const getQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaire = yield Quesionnaire_1.default.findById(req.params.id);
    if (questionnaire) {
        res.json(questionnaire);
    }
    else {
        res.status(404);
        throw new Error("Questionnaire not found");
    }
}));
exports.getQuestionnaire = getQuestionnaire;
const getAllQuestionnaires = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaires = yield Quesionnaire_1.default.find({ user: req.user._id });
    res.json(questionnaires);
}));
exports.getAllQuestionnaires = getAllQuestionnaires;
const answerQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaires = yield Quesionnaire_1.default.findById(req.params.id);
    const mutableResponses = questionnaires.responses;
    mutableResponses.push(req.body.answers);
    questionnaires.responses.push(req.body.answers);
    // res.json(questionnaires);
}));
exports.answerQuestionnaire = answerQuestionnaire;
//# sourceMappingURL=quesionnaireControllers.js.map