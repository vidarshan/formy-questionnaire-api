import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getQuestionnaire,
  getAllQuestionnaires,
  createQuestionnaire,
  deleteQuestionnaire,
  editQuestionnaire,
  publishQuestionnaire,
  answerQuestionnaire,
} from "../controllers/quesionnaireControllers";
const router = express.Router();

router
  .route("/")
  .get(protect, getAllQuestionnaires)
  .post(protect, createQuestionnaire);
router.route("/submitAnswer").get(protect, answerQuestionnaire);
router
  .route("/:id")
  .get(protect, getQuestionnaire)
  .delete(protect, deleteQuestionnaire)
  .put(protect, editQuestionnaire);
router.route("/:id/publish").put(protect, publishQuestionnaire);

export default router;
