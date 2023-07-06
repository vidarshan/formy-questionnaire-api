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
exports.submitResponse = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Quesionnaire_1 = __importDefault(require("../models/Quesionnaire"));
const Response_1 = __importDefault(require("../models/Response"));
const submitResponse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const questionnaire = yield Quesionnaire_1.default.findById(req.params.id);
    const ifAnswered = yield Response_1.default.find({ questionnaireId: questionnaire._id });
    if ((ifAnswered === null || ifAnswered === void 0 ? void 0 : ifAnswered.length) > 0) {
        res.json({ message: "Questionnaire already answered" });
    }
    else {
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
            const createdPaper = yield Response_1.default.create(newPaper);
            res.status(201).json(createdPaper);
        }
    }
}));
exports.submitResponse = submitResponse;
//# sourceMappingURL=responseControllers.js.map