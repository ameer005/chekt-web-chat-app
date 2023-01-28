const Chat = require("../../models/chat/chat");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const AppError = require("../../utils/appError/appError");

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
  const chats = await Chat.find({
    members: { $elemMatch: { user: req.user._id } },
  }).populate({
    path: "members",
    populate: {
      path: "user",
      model: "User",
      select: "-friends -adminAccess -__v -email",
    },
  });
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
