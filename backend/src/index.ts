import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { verifyFireBaseToken } from "./controllers/auth.controller";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",(req,res)=>{
res.json({
    message:"api ruinning successfully",
})
});

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("connected successfully"))
  .catch((error) => console.log("mongoose error in connection", error));

app.listen(3000);
