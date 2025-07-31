import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export interface AuthRequest extends Request {
user?:any
}

dotenv.config();
const authMiddleWare = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token in auth Header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET!);
    req.user  = decoded
    next();
  } catch (error) {
     return res.status(401).json({ error: "Invalid token" });
  }
};


export default authMiddleWare