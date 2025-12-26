// const sessionIdToUserMap = new Map();
import jwt from "jsonwebtoken";

export function setUser(user) {
  // sessionIdToUserMap.set(id, user);
  const secret = process.env.secretKey;
  if (!secret) console.log("JWT SECRET:", secret);
  const token = { _id: user._id, email: user.email, role: user.role };
  return jwt.sign(token, secret);
}

export function getUser(token) {
  // console.log(sessionIdToUserMap);
  const secret = process.env.secretKey;

  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}
