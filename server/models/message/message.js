const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    reciever: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      trim: true,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
