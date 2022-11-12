import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

const port = 6000;

app.use("/api/users", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Quesionnaire API running on port ${port}`));
