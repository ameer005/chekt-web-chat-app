const express = require("express");
const authenticateUser = require("../../middleware/authentication/authentication");
const {
  signUp,
  activateAccount,
  forgotPassword,
  login,
  sendActivationCode,
  validateForgotPassword,
  handleRequest,
  getAllUser,
  getUser,
  removeFriend,
  sendRequest,
  getMe,
  getMyRequests,
} = require("../../controllers/user/userController");

const router = express.Router();
router.route("/signup").post(signUp);
router.route("/activate").post(activateAccount);
router.route("/login").post(login);
router.route("/sendActivationCode").post(sendActivationCode);
router.route("/forgotPassword").post(forgotPassword);
router.route("/validateForgotPassword").post(validateForgotPassword);
router.route("/me").get(authenticateUser, getMe);
router.route("/").get(authenticateUser, getAllUser);
router.route("/get-my-requests").get(authenticateUser, getMyRequests);

router.route("/:id").get(getUser);
router.route("/send-request/:id").patch(authenticateUser, sendRequest);
router.route("/handle-request/:id").patch(authenticateUser, handleRequest);
router.route("/remove-friend/:id").patch(authenticateUser, removeFriend);

module.exports = router;
