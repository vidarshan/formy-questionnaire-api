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
exports.answerQuestionnaire = exports.getQuestionnaire = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Quesionnaire_1 = __importDefault(require("../models/Quesionnaire"));
const getQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaire = yield Quesionnaire_1.default.findById(req.params.id);
    if (questionnaire.isPublished) {
        if (questionnaire) {
            res.json(questionnaire);
        }
        else {
            res.status(404);
            throw new Error("Questionnaire not found");
        }
    }
    else {
        res.status(403).json({ message: "Questionnaire Ended" });
    }
}));
exports.getQuestionnaire = getQuestionnaire;
const answerQuestionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionnaires = yield Quesionnaire_1.default.findById(req.body.questionnaireId);
    const mutableResponses = questionnaires.responses;
    mutableResponses.push(req.body);
    questionnaires.responses = mutableResponses;
    const updatedQuestionnaire = yield questionnaires.save();
    res.status(201).json(updatedQuestionnaire);
}));
exports.answerQuestionnaire = answerQuestionnaire;
//# sourceMappingURL=responseControllers.js.map