"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const uuidv4_1 = require("uuidv4");
const optionSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: (0, uuidv4_1.uuid)(),
    },
    label: { type: String, required: true },
    value: { type: String, required: true },
});
const questionSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: (0, uuidv4_1.uuid)(),
    },
    title: { type: String, required: true },
    type: { type: String, required: true },
    values: { type: String, required: false },
    options: [optionSchema],
    answers: { type: String, default: null, required: false },
    required: { type: Boolean, default: false, required: false },
}, {
    timestamps: true,
});
const answerSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: (0, uuidv4_1.uuid)(),
    },
    title: { type: String, required: true },
    type: { type: String, required: true },
    values: { type: String, required: false },
    answers: { type: String, default: null, required: false },
    required: { type: Boolean, default: false, required: false },
}, {
    timestamps: true,
});
const responseSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: (0, uuidv4_1.uuid)(),
    },
    answers: [answerSchema],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
});
const quesionnaireSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isAuthRequired: {
        type: Boolean,
        required: false,
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
    },
    isLinkValid: {
        type: Boolean,
        required: true,
    },
    isOneTime: {
        type: Boolean,
        required: true,
    },
    questions: [questionSchema],
    responses: [questionSchema],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
});
const Quesionnaire = mongoose_1.default.model("Quesionnaire", quesionnaireSchema);
exports.default = Quesionnaire;
//# sourceMappingURL=Quesionnaire.js.map