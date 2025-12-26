import express from "express";
import URL from "../models/url.js";
import { restrictTo } from "../middlewares/auth.js";
import identifyUser from "../service/identification.js";

const router = express.Router();

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const all = await URL.find({ createdBy: req.user._id });
  return res.render("home", { all: all });
});

router.get("/admin", restrictTo("ADMIN"), async (req, res) => {
  const all = await URL.find({}).populate("createdBy");
  return res.render("home", { all: all, role: "ADMIN" });
});
router.get("/signup", (req, res) => res.render("signup.ejs"));
router.get("/login", (req, res) => res.render("login.ejs"));

export default router;
