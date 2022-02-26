import mongoose, { Schema } from "mongoose";
import Message from "../../models/messages/Messages";
/**
 * @file Define the variables and types 
 * documents in the messages collection
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: String,
    to: { type: Schema.Types.ObjectId, ref: "UserModel" },
    from: { type: Schema.Types.ObjectId, ref: "UserModel" },
    sentOn: Date
}, { collection: "Messages" });
export default MessageSchema;