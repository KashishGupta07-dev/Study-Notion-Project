const express = require("express");
const router = express.Router();
const {login,signup, sendOtp} = require("../controllers/auth");
const {auth} = require("../middlewares/auth");
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword");
const { contactUsController } = require("../controllers/contactUs");

router.post("/login",login);
router.post("/signup", signup);
router.post("/sendotp", sendOtp);
router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password", resetPassword);
router.post("/contactus",contactUsController);


module.exports = router