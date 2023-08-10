"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const quesionnaireControllers_1 = require("../controllers/quesionnaireControllers");
const router = express_1.default.Router();
router
    .route("/")
    .get(authMiddleware_1.protect, quesionnaireControllers_1.getAllQuestionnaires)
    .post(authMiddleware_1.protect, quesionnaireControllers_1.createQuestionnaire);
router.route("/stats").get(authMiddleware_1.protect, quesionnaireControllers_1.getAllQuestionnairesStats);
router
    .route("/:id")
    .get(authMiddleware_1.protect, quesionnaireControllers_1.getQuestionnaire)
    .delete(authMiddleware_1.protect, quesionnaireControllers_1.deleteQuestionnaire)
    .put(authMiddleware_1.protect, quesionnaireControllers_1.editQuestionnaire);
router.route("/:id/publish").put(authMiddleware_1.protect, quesionnaireControllers_1.publishQuestionnaire);
router.route("/:id/unpublish").put(authMiddleware_1.protect, quesionnaireControllers_1.unPublishQuestionnaire);
exports.default = router;
//# sourceMappingURL=quesionnaireRoutes.js.map