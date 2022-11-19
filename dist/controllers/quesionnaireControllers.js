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
exports.createQuesionnaire = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const createQuesionnaire = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, isReversible, questions, isOnePage } = req.body;
    // const user = await User.findOne({ email });
    if (req.body) {
        // tslint:disable-next-line:no-console
        console.log(title);
        // tslint:disable-next-line:no-console
        console.log(description);
        // tslint:disable-next-line:no-console
        console.log(isReversible);
        // tslint:disable-next-line:no-console
        console.log(questions);
        // tslint:disable-next-line:no-console
        console.log(isOnePage);
        //   res.json({
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     isAdmin: user.isAdmin,
        //     token: generateToken(user._id),
        //   });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
}));
exports.createQuesionnaire = createQuesionnaire;
//# sourceMappingURL=quesionnaireControllers.js.map