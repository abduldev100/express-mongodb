import express from "express";
import user from "../../controllers/api/User.js"

const router = express.Router()

router.get("/user", user.listing)
router.get("/user/:id/", user.listing)
router.post("/user", user.create)
router.patch("/user/:id", user.update)
router.delete("/user/:id", user.delete)

export default router;