const Message = require("../../models/message/message");
const Chat = require("../../models/chat/chat");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const AppError = require("../../utils/appError/appError");
const APIFeature = require("../../utils/apiFeatures/apiFeatures");

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

  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: text,
  });

  res.status(200).json({
    status: "success",
    message,
  });
});

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const limit = req.query.limit * 1 || 30;
  const page = req.query.page * 1 || 1;
  const totalMessage = await Message.countDocuments({ chatId });
  const totalPages = Math.ceil(totalMessage / limit);

  const features = new APIFeature(
    Message.find({ chatId }),
    req.query
  ).paginate();

  const messages = await features.query;

  res.status(200).json({
    page,
    totalPages,
    status: "success",
    messages,
  });
});
