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

AlbumSchema.methods.deleteFile = async function (fileData, idx) {
  this.fileData[fileData] = await this.fileData[fileData].filter(
    (x, index, item) => index !== idx
  );

  return this.fileData[fileData];
};

AlbumSchema.methods.changeFile = async function (keyid) {
  this.fileData.files = this.fileData.files.map((file) =>
    file.keyid === parseInt(keyid, 10)
      ? {
          ...file,
          like: !file.like,
        }
      : file
  );
};

AlbumSchema.methods.reverseFile = async function () {
  this.fileData.files = this.fileData.files
    .sort(function (a, b) {
      b.keyid - a.keyid;
    })
    .map((file) => file);
};

const Album = mongoose.model('Album', AlbumSchema);

export default Album;
