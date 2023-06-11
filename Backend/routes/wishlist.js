import express from "express";
import { addPropertyToWishlist, getWishlistItemsByClientId, removePropertyFromWishlist } from "../controllers/WishlistController.js";

const router = express.Router();



router.put("/add",addPropertyToWishlist)
router.get("/:id",getWishlistItemsByClientId)
router.delete("/delete",removePropertyFromWishlist)

export default router