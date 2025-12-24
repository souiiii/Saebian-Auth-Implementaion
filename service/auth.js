// const sessionIdToUserMap = new Map();
import jwt from "jsonwebtoken";
const secret = process.env.secretKey;

export function setUser(id, user) {
  // sessionIdToUserMap.set(id, user);
  const payload = { id, ...user };
  return jwt.sign(payload);
}

export function getUser(id) {
  // console.log(sessionIdToUserMap);
  return sessionIdToUserMap.get(id);
}
