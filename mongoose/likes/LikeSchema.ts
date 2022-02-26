import mongoose, { Schema } from "mongoose";
import Like from "../../models/likes/Like";
/**
 * @file Define the variables and types 
 * documents in the likes collection
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "likes" });
export default LikeSchema;