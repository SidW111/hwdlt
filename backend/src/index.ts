import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { verifyFireBaseToken } from "./controllers/auth.controller";
import authRouter from "./routes/auth.route";
import notesRouter from "./routes/notes.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",authRouter);
app.use("/api/notes",notesRouter);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("connected successfully"))
  .catch((error) => console.log("mongoose error in connection", error));

app.listen(3000);
