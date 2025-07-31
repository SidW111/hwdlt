
import express from "express"
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller"
import authMiddleWare from "../middlewares/authMiddleware"

const notesRouter = express.Router()

notesRouter.post("/create",authMiddleWare,createNote);
notesRouter.get("/get",authMiddleWare,getNotes);
notesRouter.post("/update/:id",authMiddleWare,updateNote);
notesRouter.delete("/delete/:id",authMiddleWare,deleteNote)

export default notesRouter