const express = require("express");
const {
  registerUser,
  loginUser,
  loggingOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllusers,
  getSingleuser,
  updateRole,
  deleteUser,
} = require("../Controllers/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");
const router = express.Router();

//userRoutes
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(loggingOutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles("admin"), getAllusers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizedRoles("admin"), getSingleuser);
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizedRoles("admin"), updateRole);
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;
