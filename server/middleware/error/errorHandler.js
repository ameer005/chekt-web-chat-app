module.exports = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong! Try again later",
  };

  if (err.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    defaultError.statusCode = 400;
    defaultError.message = `invalid ${err.path}: ${err.value}`;
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `${Object.keys(
      err.keyValue
    )} Field has to be unique `;
  }

  if (err.name === "JsonWebTokenError") {
    defaultError.statusCode = 401;
    defaultError.message = "Invalid token! Please try again later";
  }

  if (err.name === "TokenExpiredError") {
    defaultError.statusCode = 401;
    defaultError.message = "Your token has expired, Please log in againr";
  }

  res.status(defaultError.statusCode).json({
    status: "fail",
    message: defaultError.message,
  });
};
