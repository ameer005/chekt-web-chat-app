const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
  username: {
    type: String,
    required: [true, ["Please provide username"]],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  picture: {
    type: String,
  },
  adminAccess: {
    type: Boolean,
    default: false,
  },
  accountActivated: {
    type: Boolean,
    default: false,
    select: false,
  },
  activationCode: {
    type: String,
    select: false,
  },
  resetPasswordCode: {
    type: String,
    select: false,
  },
  friends: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3], // add requested pending friends
      },
    },
  ],
});

// document middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.createJwt = function (days) {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: days,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
