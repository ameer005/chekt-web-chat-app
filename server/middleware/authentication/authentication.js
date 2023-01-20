const catchAsync = require("../../utils/catchAsync/catchAsync");
const AppError = require("../../utils/appError/appError");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");

const auth = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // checking if token exist or not
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(
      new AppError("You are not logged in! please login to get access", 401)
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // validating the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decode.userId);

    if (!freshUser) {
      return next(new AppError("The user does not exist", 401));
    }

    req.user = freshUser;
    next();
  } catch (error) {
    console.log(error);
    return next(new AppError("Authentication failed", 401));
  }
});

// const auth = catchAsync(async (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;

//   // checking if token exist or not
//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     return next(
//       new AppError("You are not logged in! please login to get access", 401)
//     );
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     // validating the token
//     const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const freshUser = await User.findById(decode.user._id);

//     if (!freshUser) {
//       return next(new AppError("The user does not exist", 401));
//     }

//     req.user = freshUser;
//     next();
//   } catch (error) {
//     console.log(error);
//     return next(new AppError("Authentication failed", 401));
//   }
// });

module.exports = auth;
