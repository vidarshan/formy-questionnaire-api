import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const app = express();

const port = 6000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Quesionnaire API running on port ${port}`));
