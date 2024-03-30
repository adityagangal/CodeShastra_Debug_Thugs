import express from "express";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import {
  authorizeAdmin,
  isAuthenticated,
  authorizeSubscribers,
} from "../middlewares/auth.js";

const router = express.Router();

// get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - except lecures cuz its onlt admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// lectured accesss krne ke liye post add lectures ke liye
router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLectures)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
