// module imports
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error/errorHandler");

// routes imports

const app = express();
dotenv.config();

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This is working",
  });
});

// fallback route
app.use((req, res) => {
  res.status(400).json({
    status: "fail",
    message: "Route does not exist",
  });
});

// GLOBAL ERROR HANDELING
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
