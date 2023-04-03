import express from "express";
import category from "../../controllers/api/Category.js"

const router = express.Router()

router.get("/category", category.listing)
router.get("/category/:id/", category.listing)
router.post("/category", category.create)
router.patch("/category/:id", category.update)
router.delete("/category/:id", category.delete)

export default router;