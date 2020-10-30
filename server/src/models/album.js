import mongoose, { Schema } from "mongoose";

const AlbumSchema = new Schema({
  coupleShareCode: {
    type: Number,
  },
  owner: {
    type: Array,
  },
});

const Album = mongoose.model("Album", AlbumSchema);

export default Album;
