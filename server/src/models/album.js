import mongoose, { Schema } from "mongoose";

const AlbumSchema = new Schema({
  coupleShareCode: {
    type: Number,
  },
  owner: Array,
  fileData: {
    filename : Array,
    like: {
      type: Boolean,
      default: false
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    }
  },
});


AlbumSchema.statics.findByCoupleShareCode = async function (
  coupleShareCode
) {
  return await this.findOne({ coupleShareCode });
};


const Album = mongoose.model("Album", AlbumSchema);
export default Album;
