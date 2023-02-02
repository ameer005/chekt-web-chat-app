const express = require("express");
const authenticateUser = require("../../middleware/authentication/authentication");
const { imageUpload } = require("../../utils/upload/fileUpload");
const {
  createMessage,
  getAllMessages,
} = require("../../controllers/message/messageController");

const router = express.Router();
const upload = imageUpload("image");

router.use(authenticateUser);

router
  .route("/:chatId")
  .get(getAllMessages)
  .post(upload.single("file"), createMessage);

module.exports = router;
