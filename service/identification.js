import userModel from "../models/user.js";

export default async function identifyUser(id) {
  const user = await userModel.findById(id);
  return user.toObject().name;
}
