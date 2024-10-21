const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const userController = new UserController();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const requireRole = require("../middlewares/requireRole");
const UserEnum = require("../enums/UserEnum");

// Apply middlewares correctly by passing them in as an array
router.put(
  "/suspense",
  AuthMiddleware, // Auth middleware to get the user ID
  requireRole(UserEnum.ADMIN), // Role-based middleware to ensure user is ADMIN
  userController.suspendedUserController // Controller function to suspend user
);

router.put(
  "/unsuspense",
  AuthMiddleware, // Auth middleware to get the user ID
  requireRole(UserEnum.ADMIN), // Role-based middleware to ensure user is ADMIN
  userController.unsuspendedUserController // Controller function to unsuspend user
);

module.exports = router;
