import express from "express";
import { protect } from "../middleware/authMiddleware";
import { submitResponse } from "../controllers/responseControllers";
const router = express.Router();
router.route("/:id").put(protect, submitResponse);

export default router;
