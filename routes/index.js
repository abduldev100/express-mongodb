import express from "express";
import Page from "../controllers/index.js";

const router = express.Router()

router.get("/", Page.Home)
router.get("/logout", Page.Logout)

export default router;