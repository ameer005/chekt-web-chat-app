const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema(
  {
    members: [memberSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
