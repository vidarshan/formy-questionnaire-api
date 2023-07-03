import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createQuestionnaire } from "../controllers/quesionnaireControllers";
const router = express.Router();

router.route("/").post(protect, createQuestionnaire);

export default router;
