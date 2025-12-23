import mongoose from "mongoose";

export default async function m(url) {
  return mongoose.connect(url);
}
