"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const quesionnaireRoutes_1 = __importDefault(require("./routes/quesionnaireRoutes"));
const responseRoutes_1 = __importDefault(require("./routes/responseRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.json());
const port = 8000;
app.use("/api/users", authRoutes_1.default);
app.use("/api/quesionnaire", quesionnaireRoutes_1.default);
app.use("/api/response", responseRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Hello world");
});
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Quesionnaire API running on port ${port}`));
//# sourceMappingURL=index.js.map