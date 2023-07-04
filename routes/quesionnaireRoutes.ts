import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createQuestionnaire,
  deleteQuestionnaire,
  editQuestionnaire,
} from "../controllers/quesionnaireControllers";
const router = express.Router();

router.route("/").post(protect, createQuestionnaire);
router
  .route("/publish/:id")
  .delete(protect, deleteQuestionnaire)
  .put(protect, editQuestionnaire);

export default router;
