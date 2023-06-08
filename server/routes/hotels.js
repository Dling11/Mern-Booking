import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create || post
router.post("/", verifyAdmin, createHotel);

// Update || put
router.put("/:id", verifyAdmin, updateHotel)

// Delete || delete method
router.delete("/:id", verifyAdmin, deleteHotel)

// Get
router.get("/:id", getHotel)

// Get All
router.get("/", getHotels)

export default router