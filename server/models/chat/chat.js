const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
