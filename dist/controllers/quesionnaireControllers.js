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
exports.publishQuestionnaire = exports.createQuestionnaire = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Quesionnaire_1 = __importDefault(require("../models/Quesionnaire"));
const createQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { title, description, isPublic, questions } = req.body;
    const newQuestionnaire = new Quesionnaire_1.default({
        title,
        description,
        isPublic,
        questions,
        user: _id,
        isPublished: true,
        isLinkValid: true,
    });
    const createdQuestionnaire = yield newQuestionnaire.save();
    res.status(201).json(createdQuestionnaire);
}));
exports.createQuestionnaire = createQuestionnaire;
const publishQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaire = yield Quesionnaire_1.default.findById(req.params.id);
    const publishedQuestionnaire = {
        title: questionnaire.title,
        description: questionnaire.description,
        isPublic: questionnaire.isPublic,
        isPublished: !questionnaire.isPublished,
        isLinkValid: questionnaire.isLinkValid,
        questions: questionnaire.questions,
        user: questionnaire.user,
    };
    const updatedQuestionnaire = yield questionnaire.save();
    res.status(201).json(updatedQuestionnaire);
}));
exports.publishQuestionnaire = publishQuestionnaire;
//# sourceMappingURL=quesionnaireControllers.js.map