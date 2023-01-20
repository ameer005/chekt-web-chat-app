const mongoose = require("mongoose");

module.exports = (url) => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(url);
};
