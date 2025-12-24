import express from "express";
import path from "path";
import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";

import m from "./connection.js";
import cookieParser from "cookie-parser";
import { restrictToLoggedInUserOnly, checkAuth } from "./middlewares/auth.js";

m("mongodb://127.0.0.1:27017/saebian")
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/saebian", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log("Server started"));
