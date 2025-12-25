// const sessionIdToUserMap = new Map();
import jwt from "jsonwebtoken";

export function setUser(user) {
  // sessionIdToUserMap.set(id, user);
  const secret = process.env.secretKey;
  if (!secret) console.log("JWT SECRET:", secret);
  return jwt.sign(user, secret);
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
