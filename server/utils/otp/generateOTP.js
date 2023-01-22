const otpGenerator = require("otp-generator");
const OTP_LENGTH = 12;
const OTP_CONFIG = {
  upperCaseAlphabets: false,
  specialChars: true,
};
function generateOTP() {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
}

module.exports = generateOTP;
