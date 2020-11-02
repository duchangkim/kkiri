import mongoose, { Schema } from "mongoose";

const fileuploadSchema = new Schema({
  CoupleCode: {
    type: Number,
  },
  BackgroundIMGS: {
    type: String,
  },
});

const FileUpload = mongoose.model("backgroundImg", fileuploadSchema);

export default FileUpload;
