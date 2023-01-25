const User = require("../../models/user/user");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const AppError = require("../../utils/appError/appError");
const APIFeature = require("../../utils/apiFeatures/apiFeatures");
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

  const user = await User.findOne({ email }).select("+activationCode");

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
  }).select("+password +accountActivated");

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

// ************************************ FRIENDS ****************************************** //

// TODO implement search by username
exports.getAllUser = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 30;
  const page = req.query.page * 1 || 1;
  let totalUsers;
  if (req.query.name) {
    totalUsers = await User.countDocuments({
      name: { $regex: req.query.name, $options: "i" },
    });
  } else {
    totalUsers = await User.countDocuments();
  }

  const totalPages = Math.ceil(totalUsers / limit);
  const features = new APIFeature(
    User.find().populate({
      path: "friends",
      populate: {
        path: "user",
        model: "User",
        select: "-friends -adminAccess -__v",
      },
    }),
    req.query
  )
    .filter()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    page,
    totalPages,
    status: "success",
    results: users.length,
    users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "friends",
    populate: {
      path: "user",
      model: "User",
      select: "-friends -adminAccess -__v",
    },
  });

  if (!user) return next(new AppError("No user found with this id", 400));

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.sendRequest = catchAsync(async (req, res, next) => {
  const requestTo = await User.findById(req.params.id);
  const me = await User.findById(req.user._id);

  const isRequesterExist = requestTo.friends.find(
    (user) => user.user.toString() === me._id.toString()
  );

  const isRequestToExist = me.friends.find(
    (user) => user.user.toString() === requestTo._id.toString()
  );

  if (isRequestToExist || isRequesterExist) {
    return next(new AppError("already friends", 400));
  }

  requestTo.friends.push({
    user: me._id,
    status: 2,
  });

  me.friends.push({
    user: requestTo._id,
    status: 1,
  });

  await Promise.all([requestTo.save(), me.save()]);

  res.status(200).json({
    status: "success",
  });
});

exports.handleRequest = catchAsync(async (req, res, next) => {
  const { accept } = req.body;
  const me = await User.findById(req.user._id);
  const requester = await User.findById(req.params.id);

  const requesterObj = me.friends.find(
    (user) => user.user.toString() === requester._id.toString()
  );

  const requestToObj = requester.friends.find(
    (user) => user.user.toString() === me._id.toString()
  );

  if (requestToObj.status === 3 && requesterObj.status === 3) {
    return next(new AppError("Already friends", 400));
  }

  if (requestToObj.status !== 1 || requesterObj.status !== 2) {
    return next(new AppError("something is worng", 400));
  }

  if (!accept) {
    me.friends.pull({ user: requester._id });
    requester.friends.pull({ user: me._id });

    await Promise.all([me.save(), requester.save()]);
    return res.status(200).json({
      status: "success",
    });
  }

  requesterObj.status = 3;
  requestToObj.status = 3;
  await Promise.all([me.save(), requester.save()]);

  res.status(200).json({
    status: "success",
  });
});

exports.removeFriend = catchAsync(async (req, res, next) => {
  const me = await User.findById(req.user._id);
  const friend = await User.findById(req.params.id);

  me.friends.pull({ user: friend._id });
  friend.friends.pull({ user: me._id });

  await Promise.all([me.save(), friend.save()]);
  res.status(200).json({
    status: "success",
  });
});
