import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: { type: String, require: true },
    prompt: { type: String, require: true },
    images: { type: Array, require: true }
})

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;