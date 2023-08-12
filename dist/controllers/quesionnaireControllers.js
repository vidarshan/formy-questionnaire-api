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
exports.unPublishQuestionnaire = exports.getAllQuestionnairesStats = exports.deleteQuestionnaire = exports.publishQuestionnaire = exports.editQuestionnaire = exports.createQuestionnaire = exports.getAllQuestionnaires = exports.getQuestionnaire = void 0;
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
        isLinkValid: false,
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
    if (req.route.path.includes("/open/")) {
        if (questionnaire.isPublic) {
            if (questionnaire) {
                res.json(questionnaire);
            }
            else {
                res.status(404);
                throw new Error("Questionnaire not found");
            }
        }
        else {
            res.status(404);
            throw new Error("Questionnaire not accessible");
        }
    }
    else {
        if (questionnaire) {
            res.json(questionnaire);
        }
        else {
            res.status(404);
            throw new Error("Questionnaire not found");
        }
    }
}));
exports.getQuestionnaire = getQuestionnaire;
const getAllQuestionnaires = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const count = yield Quesionnaire_1.default.countDocuments(Object.assign(Object.assign({}, keyword), { user: req.user._id }));
    const questionnaires = yield Quesionnaire_1.default.find(Object.assign(Object.assign({}, keyword), { user: req.user._id }))
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({
        questionnaires,
        page,
        pages: Math.ceil(count / pageSize),
        keyword,
    });
}));
exports.getAllQuestionnaires = getAllQuestionnaires;
const getAllQuestionnairesStats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const published = (_a = (yield Quesionnaire_1.default.find({ isPublished: true, user: req.user._id }))) === null || _a === void 0 ? void 0 : _a.length;
    const unPublished = (_b = (yield Quesionnaire_1.default.find({ isPublished: false, user: req.user._id }))) === null || _b === void 0 ? void 0 : _b.length;
    const all = (_c = (yield Quesionnaire_1.default.find({ user: req.user._id }))) === null || _c === void 0 ? void 0 : _c.length;
    res.json({
        published,
        unPublished,
        all,
    });
}));
exports.getAllQuestionnairesStats = getAllQuestionnairesStats;
const unPublishQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaire = yield Quesionnaire_1.default.findById(req.params.id);
    if (questionnaire) {
        questionnaire.isPublished = false;
    }
    const updatedQuestionnaire = yield questionnaire.save();
    res.status(201).json(updatedQuestionnaire);
}));
exports.unPublishQuestionnaire = unPublishQuestionnaire;
//# sourceMappingURL=quesionnaireControllers.js.map