import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res) => {
  res.send("Hellow user, you are logged in");
})

// Update || put
router.put("/:id", verifyUser, updateUser)

// Delete || delete method
router.delete("/:id", verifyUser, deleteUser)

// Get
router.get("/:id", verifyUser, getUser)

// Get All
router.get("/", verifyAdmin, getUsers) // only that admin can verify this

export default router