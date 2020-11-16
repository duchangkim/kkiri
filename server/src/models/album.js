import mongoose, { Schema } from 'mongoose';

const AlbumSchema = new Schema({
  coupleShareCode: {
    type: Number,
  },
  owner: Array,
  fileData: {
    files: {
      type: Array,
    },
  },
});

AlbumSchema.statics.findByCoupleShareCode = async function (coupleShareCode) {
  return await this.findOne({ coupleShareCode });
};

AlbumSchema.methods.deleteFile = async function (
  fileData,
  idx
) {
  console.log(this.fileData.files);
  console.log(this.fileData[fileData]);
  this.fileData[fileData] = await this.fileData[
    fileData
  ].filter(
    (x, index, item) => index !== idx
    );

  console.log('여기드러옴?');
  console.log(idx);


  return this.fileData[fileData];
};

const Album = mongoose.model('Album', AlbumSchema);

export default Album;
