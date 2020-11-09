import mongoose, { Schema } from 'mongoose';

const AlbumSchema = new Schema({
  coupleShareCode: {
    type: Number,
  },
  owner: Array,
  fileData: {
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
  }
});



AlbumSchema.statics.findByCoupleShareCode = async function (coupleShareCode) {
  return await this.findOne({ coupleShareCode });
};



const Album = mongoose.model('Album', AlbumSchema);
export default Album;
