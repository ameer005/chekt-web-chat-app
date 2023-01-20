const catchAsync = require("../../utils/catchAsync/catchAsync");
const AppError = require("../../utils/appError/appError");

module.exports = catchAsync(async (req, res, next) => {
  if (!req.user.adminAccess) {
    return next(
      new AppError("You don't have permission to access this endpoint", 403)
    );
  }

  next();
});
