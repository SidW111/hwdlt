import jwt from "jsonwebtoken";
import { IUser } from "../modals/user.model";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user: IUser): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment variables");
  }
  return jwt.sign({ id: user._id, uid: user.uid }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
