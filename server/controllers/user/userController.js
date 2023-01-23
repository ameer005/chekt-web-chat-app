const User = require("../../models/user/user");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const AppError = require("../../utils/appError/appError");
const {
  sendActivationCode,
  sendForgotPasswordCode,
} = require("../../utils/email/email");
const generateOtp = require("../../utils/otp/generateOTP");

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, username, password, email } = req.body;

  if (!name || !username || !password || !email) {
    return next(new AppError("Please provide all vlaues.", 400));
  }
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return next(new AppError("User already exist", 400));
  }

  const isUsernameTaken = await User.findOne({ username });
  if (isUsernameTaken) {
    return next(new AppError("Please choose different username", 400));
  }

  const otp = generateOtp();
  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    activationCode: otp,
    name,
    // adminAccess: true,
  });

  sendActivationCode(user.username, user.email, user.activationCode);

  res.status(201).json({
    status: "success",
    data: {
      email: user.email,
    },
  });
});

// activate account
exports.activateAccount = catchAsync(async (req, res, next) => {
  const { code, email } = req.body;

  if (!code || !email) {
    return next(new AppError("Please provide all values", 400));
  }

  const user = await User.findOne({ activationCode: code, email });

  if (!user) {
    return next(new AppError("Please provide a valid code", 401));
  }

  user.accountActivated = true;
  user.activationCode = "00##00";
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Account successfully activated",
  });
});

// resent activation code
exports.sendActivationCode = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide email", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("No user found", 400));
  }

  const code = generateOtp();

  user.activationCode = code;
  await user.save();

  sendActivationCode(user.username, user.email, code);

  res.status(200).json({
    status: "success",
  });
});

// login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide all values", 400));
  }

  const user = await User.findOne({
    $or: [{ email }, { username: email }],
  }).select("+password");

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  if (!user.accountActivated) {
    return next(new AppError("Please activate your account", 403));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = user.createJwt("2d");

  user.password = undefined;
  user.activationCode = undefined;
  user.accountActivated = undefined;

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

// forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide email", 400));
  }

  const user = await User.findOne({ email }).select("+resetPasswordCode");

  if (!user) {
    return next(new AppError("No user found", 400));
  }

  const code = generateOtp();
  user.resetPasswordCode = code;
  await user.save();

  sendForgotPasswordCode(user.username, user.email, code);

  res.status(200).json({
    status: "success",
    message: "otp has been successfully sent to your registered email account",
  });
});

// validate forgot password
exports.validateForgotPassword = catchAsync(async (req, res, next) => {
  const { code, password, email } = req.body;

  if (!code || !password || !email) {
    return next(new AppError("Please provide all values", 400));
  }

  const user = await User.findOne({
    resetPasswordCode: code,
    email,
  }).select("+resetPasswordCode");

  if (!user) {
    return next(new AppError("Please provide valid verification code", 400));
  }

  user.password = password;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Your password has been changed successfully",
  });
});
