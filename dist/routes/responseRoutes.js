"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const responseControllers_1 = require("../controllers/responseControllers");
const router = express_1.default.Router();
router.route("/:id").put(authMiddleware_1.protect, responseControllers_1.submitResponse);
exports.default = router;
//# sourceMappingURL=responseRoutes.js.map