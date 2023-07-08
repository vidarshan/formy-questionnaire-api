import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getQuestionnaire,
  getAllQuestionnaires,
  createQuestionnaire,
  deleteQuestionnaire,
  editQuestionnaire,
} from "../controllers/quesionnaireControllers";
const router = express.Router();

router
  .route("/")
  .get(protect, getAllQuestionnaires)
  .post(protect, createQuestionnaire);
router
  .route("/:id")
  .get(protect, getQuestionnaire)
  .delete(protect, deleteQuestionnaire)
  .put(protect, editQuestionnaire);

export default router;
