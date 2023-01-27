const express = require("express");
const authenticateUser = require("../../middleware/authentication/authentication");
const {
  createMessage,
  getAllMessages,
} = require("../../controllers/message/messageController");

const router = express.Router();

router.use(authenticateUser);

router.route("/:chatId").get(getAllMessages).post(createMessage);

module.exports = router;
