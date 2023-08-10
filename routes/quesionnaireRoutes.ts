import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getQuestionnaire,
  getAllQuestionnaires,
  createQuestionnaire,
  deleteQuestionnaire,
  editQuestionnaire,
  publishQuestionnaire,
  getAllQuestionnairesStats,
  unPublishQuestionnaire,
} from "../controllers/quesionnaireControllers";
const router = express.Router();

router
  .route("/")
  .get(protect, getAllQuestionnaires)
  .post(protect, createQuestionnaire);
router.route("/stats").get(protect, getAllQuestionnairesStats);

router
  .route("/:id")
  .get(protect, getQuestionnaire)
  .delete(protect, deleteQuestionnaire)
  .put(protect, editQuestionnaire);
router.route("/:id/publish").put(protect, publishQuestionnaire);
router.route("/:id/unpublish").put(protect, unPublishQuestionnaire);

export default router;
