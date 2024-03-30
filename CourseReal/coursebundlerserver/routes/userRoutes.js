import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateUserRole,
  updateprofilepicture,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// register new user
router.route("/register").post(singleUpload, register);

// login user
router.route("/login").post(login);

// logout
router.route("/logout").get(logout);

//middlewares ke liye
router.route("/me").get(isAuthenticated, getMyProfile);

// delete user profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// change password and update krna hai isliye put request
router.route("/changepassword").put(isAuthenticated, changePassword);

// for profile update
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// update the profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateprofilepicture);

// forget password
router.route("/forgetpassword").post(forgetPassword);

// reset password
router.route("/resetpassword/:token").put(resetPassword);

// add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// admin routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

//update user role
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
