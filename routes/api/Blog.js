import express from "express";
import blog from "../../controllers/api/Blog.js"
import JWTauthenticate from "../../middlewares/JWTauthenticate.js";
import IsSuperuser from "../../middlewares/IsSuperuser.js";
import Image from "../../middlewares/Image.js";

const router = express.Router()

router.get("/blog", blog.listing)
router.get("/blog/:id/", blog.listing)
router.post("/blog", JWTauthenticate, IsSuperuser, Image.single("image"), blog.create)
router.patch("/blog/:id", blog.update)
router.delete("/blog/:id", blog.delete)

export default router;