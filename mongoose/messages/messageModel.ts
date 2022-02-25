import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";
const MessageModel = mongoose.model("FollowModel", MessageSchema);
export default MessageModel;