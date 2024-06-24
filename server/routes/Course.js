const express = require("express");
const { auth,isInstructor,isStudent,isAdmin } = require("../middlewares/auth");
const { createCourse, showAllCourses, showCourse, editCourse, deleteCourse, getEnrolledCourses, getFullCourseDetails } = require("../controllers/courseCreation");
const { createSection, editSection, deleteSection } = require("../controllers/createSection");
const { createSubSection, editSubSection, deleteSubSection } = require("../controllers/createSubsection");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/createCategory");
const { createRating, getAverageRating, getAllRating } = require("../controllers/ratingAndReview");
const router = express.Router();

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/updateCourse", auth, isInstructor, editCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, editSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/addSubSection", auth, isInstructor,createSubSection);
router.post("/updateSubSection", auth, isInstructor, editSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.get("/getAllCourses",auth, showAllCourses);
router.get("/getEnrolledCourses",auth,isStudent,getEnrolledCourses);
router.post("/getCourseDetails", showCourse);
router.post("/getFullCourseDetails",auth,isStudent,getFullCourseDetails);
router.post("/deleteCourse",auth,isInstructor,deleteCourse);


router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);


router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);


module.exports = router;
