import express from "express";
import { createGig, getGigs } from "../controllers/gigController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", auth, createGig);

export default router;
