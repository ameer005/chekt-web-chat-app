const Chat = require("../../models/chat/chat");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const AppError = require("../../utils/appError/appError");
const APIFeature = require("../../utils/apiFeatures/apiFeatures");

exports.createChat = catchAsync(async (req, res, next) => {
  const { memberId1, memberId2 } = req.body;

  const chat = await Chat.create({
    members: [{ user: memberId1 }, { user: memberId2 }],
  });

  res.status(200).json({
    message: "success",
    chat,
  });
});

exports.getAllChats = catchAsync(async (req, res, next) => {
  const features = new APIFeature(
    Chat.find({
      members: { $elemMatch: { user: req.user._id } },
    }).populate({
      path: "members",
      populate: {
        path: "user",
        model: "User",
        select: "-friends -adminAccess -__v -email",
      },
    }),
    req.query
  ).sort();

  const chats = await features.query;

  res.status(200).json({
    message: "success",
    chats,
  });
});

exports.getchat = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: "success",
  });
});

exports.deleteChat = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: "success",
  });
});
