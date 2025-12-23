import express from "express";
import {
  generateUrlShortner,
  getAnalytics,
  redirectFunc,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", generateUrlShortner);

router.get("/analytics/:id", getAnalytics);
router.get("/:id", redirectFunc);

// router.get("/analytics/:id", handleAnalytics);

export default router;
