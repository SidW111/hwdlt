import { Request, Response } from "express";
import admin from "../firebase/admin";
import userModel from "../models/user.model";
import { generateToken } from "../utils/generateToken";

export const verifyFireBaseToken = async (req: Request, res: Response) => {
  const { firebaseToken } = req.body;
  console.log("🔥 Received Firebase token:", firebaseToken);

  try {
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    console.log("✅ Firebase token decoded:", decoded);

    const { uid, name, email, firebase } = decoded;
    let user = await userModel.findOne({ uid });

    if (!user) {
      user = await userModel.create({
        uid,
        name,
        email,
        authProvider: firebase?.sign_in_provider || "unknown",
      });
    }

    const token = generateToken(user);
    return res.json({ token, user });
  } catch (error) {
    console.error("❌ Firebase token verification failed:", error);
    return res.status(401).json({ error: "Invalid firebase token" });
  }
};
