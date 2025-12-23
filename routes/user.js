import express from "express";
import { loginUser, signupUser } from "../controllers/user.js";

const router = express.Router();

// router.get("/login");

router.post("/login", loginUser);
router.post("/signup", signupUser);

export default router;
