
import express from "express"
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller"
import authMiddleWare from "../middlewares/authMiddleware"

const notesRouter = express.Router()

notesRouter.post("/",authMiddleWare,createNote);
notesRouter.get("/",authMiddleWare,getNotes);
notesRouter.post("/:id",authMiddleWare,updateNote);
notesRouter.delete("/:id",authMiddleWare,deleteNote)

export default notesRouter