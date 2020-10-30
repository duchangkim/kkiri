import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema({
  coupleShareCode: {
    type: Number,
  },
  owner: {
    type: Array,
  },
  chattingData: {
    type: Array,
  },
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
