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
  owner: {
    Array,
  },
  fileData: {
<<<<<<< HEAD
    files: { 
      type: Array,
      default : [
        {
          idx: Number,
          filename: String,
          like: Boolean, default: false,
          publishedDate: Date, defaut: Date.now,
        }
      ]
    }
=======
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
>>>>>>> 9cc190b9f73383943ccce9b8da324d11d28e6b80
  },
});

AlbumSchema.statics.findByCoupleShareCode = async function (coupleShareCode) {
  return await this.findOne({ coupleShareCode });
};



const Album = mongoose.model('Album', AlbumSchema);
export default Album;
