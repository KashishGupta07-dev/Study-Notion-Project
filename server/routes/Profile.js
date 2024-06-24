const express = require("express");
const { auth, isInstructor } = require("../middlewares/auth");
const {deleteProfile, editProfile, getUserDetails, updateProfilepic} = require("../controllers/editProfile");
const {changePassword} = require("../controllers/auth");
const { InstructorPieDetails } = require("../controllers/courseCreation");
const router = express.Router();


router.delete("/deleteProfile",auth,deleteProfile);
router.put("/updateProfile", auth, editProfile);
router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateDisplayPicture",auth,updateProfilepic);
router.put("/changePassword",auth,changePassword);
router.get("/getInstructorDetails",auth,isInstructor,InstructorPieDetails);
module.exports = router;