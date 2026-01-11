import express from "express";
import auth from "../middleware/authMiddleware.js";
import { placeBid, getBidsForGig } from "../controllers/bidController.js";

const router = express.Router();

router.post("/", auth, placeBid);
router.get("/:gigId", auth, getBidsForGig);

export default router;
