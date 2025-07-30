import jwt from "jsonwebtoken";
import { IUser } from "../modals/user.model";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user.name, uid: user.uid }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
