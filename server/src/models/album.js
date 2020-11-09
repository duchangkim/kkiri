import mongoose, { Schema } from 'mongoose';

const AlbumSchema = new Schema({
<<<<<<< HEAD
  owner: Array,
  filename: String,
  publishedDate: {
    type: Date,
    default: Date.now,
=======
  coupleShareCode: {
    type: Number,
  },
  owner: Array,
  fileData: {
    filename: Array,
    like: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
>>>>>>> d1860e5fe5bf713f81a860751457df4ad40f8603
  },
});

AlbumSchema.statics.findByCoupleShareCode = async function (coupleShareCode) {
  return await this.findOne({ coupleShareCode });
};

const Album = mongoose.model('Album', AlbumSchema);
export default Album;
