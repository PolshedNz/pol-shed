const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.get("/signup", authController.getSignup);
router.post("/signup", authController.signup);
router.get("/verify-email", authController.verifyEmail);

router.get("/login", authController.getLogin);
router.post("/login", authController.login);

// router.get("/users", authController.getAllUsers);
// router.patch("/users/:id", authController.updateUser);
// router.delete("/users/:id", authController.deleteUser);

module.exports = router;
