import mongoose, { Mongoose, Schema } from "mongoose";

export interface IUser extends Document {
    uid:string,
    email:string,
    name?:string,
    authProvider: string

}

const userSchema = new Schema<IUser>({
    uid:{type:String,required:true,unique:true},
    email:String,
    name:String,
    authProvider:String
})

export default mongoose.model<IUser>("user",userSchema)