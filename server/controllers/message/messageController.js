const Message = require("../../models/message/message");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const AppError = require("../../utils/appError/appError");

exports.createMessage = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const { text } = req.body;

  if (!text) {
    return next(new AppError("Please provide all values", 400));
  }

  const message = await Message.create({
    chatId,
    sender: req.user._id.toString(),
    text,
  });

  res.status(200).json({
    status: "success",
    message,
  });
});

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  const messages = await Message.find({ chatId });

  res.status(200).json({
    status: "success",
    messages,
  });
});
