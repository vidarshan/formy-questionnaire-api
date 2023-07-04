"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const quesionnaireControllers_1 = require("../controllers/quesionnaireControllers");
const router = express_1.default.Router();
router.route("/").post(authMiddleware_1.protect, quesionnaireControllers_1.createQuestionnaire);
router.route("/publish/:id").put(authMiddleware_1.protect, quesionnaireControllers_1.publishQuestionnaire);
exports.default = router;
//# sourceMappingURL=quesionnaireRoutes.js.map