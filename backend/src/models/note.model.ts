import { timeStamp } from "console";
import mongoose, { Document, Mongoose, Schema } from "mongoose";

interface INote extends Document {
  title: string;
  content: string;
  user: mongoose.Schema.Types.ObjectId;
}

const notes = new Schema<INote>({
  title: String,
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  
},{timestamps:true});

 const NoteModel = mongoose.model<INote>('note',notes)

 export default NoteModel;