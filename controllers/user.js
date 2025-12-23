import user from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

export async function signupUser(req, res) {
  const { name, email, password } = req.body;

  await user.create({ name, email, password });
  return res.redirect("/");
}

export async function loginUser(req, res) {
  const body = req.body;
  const use = await user.findOne({
    email: body.email,
    password: body.password,
  });
  if (!use)
    return res.render("login", { error: "invalid username or password" });

  const sessionId = uuidv4();
  setUser(sessionId, use);
  res.cookie("uid", sessionId);
  return res.status(200).redirect("/");
}

export async function loginPage(req, res) {}
export async function signupPage(req, res) {}
