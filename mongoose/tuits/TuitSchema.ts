import mongoose, { Schema } from "mongoose";
import Tuit from "../../models/tuits/Tuit";
/**
 * @file Define the variables and types 
 * documents in the tuits collection
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    postedOn: { type: Date, default: Date.now },
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number
    }
}, { collection: "tuits" });
export default TuitSchema;