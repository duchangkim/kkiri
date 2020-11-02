import mongoose, { Schema } from "mongoose";

const AlbumSchema = new Schema({
  owner: String,
  fileImg : String,
  txt: String,
  publishedDate: {
    type: Date,
    default: Date.now,
  }
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;
