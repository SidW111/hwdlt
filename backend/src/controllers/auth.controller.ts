import { Request, Response } from "express";
import admin from "../firebase/admin";
import userModel from "../modals/user.model";
import { generateToken } from "../utils/generateToken";

export const verifyFireBaseToken = async (req: Request, res: Response) => {
  const { firebaseToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const { uid, name, email, firebase } = decoded;

    let user = await userModel.findOne({ uid });

    if (!user) {
      user = await userModel.create({
        uid,
        name,
        email,
        authProvider: firebase.sign_in_provider,
      });
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (error) {
    console.log("firebase verfication failed", error);
    res.status(401).json({ error: "Invalid firebase token" });
  }
};
