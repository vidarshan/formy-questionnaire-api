import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createQuestionnaire,
  publishQuestionnaire,
} from "../controllers/quesionnaireControllers";
const router = express.Router();

router.route("/").post(protect, createQuestionnaire);
router.route("/publish/:id").put(protect, publishQuestionnaire);

export default router;
