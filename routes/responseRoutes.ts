import express from "express";
import {
  answerQuestionnaire,
  getQuestionnaire,
} from "../controllers/responseControllers";
const router = express.Router();

router.route("/:id").get(getQuestionnaire);
router.route("/submit").put(answerQuestionnaire);

export default router;
