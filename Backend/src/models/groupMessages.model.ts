import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Types.ObjectId,
    ref: "Group",
    required: true
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);

export default GroupMessage;
