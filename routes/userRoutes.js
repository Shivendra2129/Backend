const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getUserById, updateUserRole, promoteToAdmin, deleteUser } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin only routes
router.get("/", auth(["admin"]), getAllUsers);
router.get("/:id", auth(["admin"]), getUserById);
router.put("/:userId/role", auth(["admin"]), updateUserRole);
router.put("/:userId/promote-admin", auth(["admin"]), promoteToAdmin);
router.delete("/:userId", auth(["admin"]), deleteUser);

module.exports = router;