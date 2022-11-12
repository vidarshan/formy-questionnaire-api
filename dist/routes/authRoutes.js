"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const router = express_1.default.Router();
router.route("/register").post(authControllers_1.registerUser);
router.route("/login").post(authControllers_1.authUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map