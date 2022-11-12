"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = 6000;
app.use("/api/users", authRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Hello world");
});
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Quesionnaire API running on port ${port}`));
//# sourceMappingURL=index.js.map