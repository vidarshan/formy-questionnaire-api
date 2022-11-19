import express from "express";
import { createQuesionnaire } from "../controllers/quesionnaireControllers";
const router = express.Router();

router.route("/").post(createQuesionnaire);

export default router;
