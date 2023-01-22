const authenticateUser = require("../../middleware/authentication/authentication");
const express = require("express");
const {
  signUp,
  activateAccount,
  forgotPassword,
  login,
  sendActivationCode,
  validateForgotPassword,
} = require("../../controllers/user/userController");

const router = express.Router();
router.route("/signup").post(signUp);
router.route("/activate").post(activateAccount);
router.route("/login").post(login);
router.route("/sendActivationCode").post(sendActivationCode);
router.route("/forgotPassword").post(forgotPassword);
router.route("/validateForgotPassword").post(validateForgotPassword);

module.exports = router;
