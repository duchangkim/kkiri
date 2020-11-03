import mongoose, { Schema } from "mongoose";

const AlbumSchema = new Schema({
  owner: String,
  filename : String,
  publishedDate: {
    type: Date,
    default: Date.now,
  }
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;
