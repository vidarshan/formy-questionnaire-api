import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createQuesionnaire } from "../controllers/quesionnaireControllers";
const router = express.Router();

router.route("/").post(protect, createQuesionnaire);

export default router;
