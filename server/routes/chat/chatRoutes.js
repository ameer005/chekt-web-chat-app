const express = require("express");
const authenticateUser = require("../../middleware/authentication/authentication");
const {
  createChat,
  deleteChat,
  getAllChats,
  getchat,
} = require("../../controllers/chat/chatController");

const router = express.Router();
router.use(authenticateUser);

router.route("/").get(getAllChats).post(createChat);
router.route("/:id").get(getchat).delete(deleteChat);

module.exports = router;
