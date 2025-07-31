import { Router } from "express";
import { verifyFireBaseToken } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post('/auth/firebase',verifyFireBaseToken)

export default authRouter