const express = require("express");
const { auth, isStudent } = require("../middlewares/auth");
const { verifyPayment, capturePayment, sendPaymentSuccessEmail } = require("../controllers/Payment");
const router = express.Router();

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth, isStudent,verifyPayment);
router.post("/sendMail",auth,isStudent,sendPaymentSuccessEmail);


module.exports = router;