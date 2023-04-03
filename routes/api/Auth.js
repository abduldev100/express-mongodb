import express from "express";
import User from "../../controllers/api/Auth.js";
import JWTauthenticate from "../../middlewares/JWTauthenticate.js";

const router = express.Router();

// Public Routes
router.post("/register", User.Registration)
router.post("/login", User.Login)
router.post("/password-rest-email", User.PasswordResetEmail)
router.post("/reset-password/:id/:token", User.PasswordReset)

// Protected Routes
router.post("/change-password", JWTauthenticate, User.ChangePassword)
router.get("/logged-user", JWTauthenticate, User.UserDetails)


export default router;