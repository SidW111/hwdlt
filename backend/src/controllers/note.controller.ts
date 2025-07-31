import { Request, Response } from "express";
import NoteModel from "../models/note.model";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createNote = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;

  try {
    const note = await NoteModel.create({ title, content, user: req.user.id });

    if (note) {
      res.status(200).json({
        note,
        message: "Note created successfully",
      });
    }
  } catch (error) {
    console.log("Error Creating note", error);
    res.json(500).json({
      message: "error creating note",
    });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const note = await NoteModel.findOne({ user: req.user.id });

    res.json(note);
  } catch (error) {
    console.log("error finding notes");
    res.status(500).json({ message: "error finding notes" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  const noteId = req.params.id;
  try {
    const note = await NoteModel.findOneAndDelete({
      _id: noteId,
      user: req.user.id,
    });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (error) {
    console.log("error deleting node", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
};
