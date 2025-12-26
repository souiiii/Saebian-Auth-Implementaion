import { getUser } from "../service/auth.js";

export function checkforAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.uid;
  req.user = null;
  // console.log(tokenCookie);
  if (!tokenCookie) return next();

  const user = getUser(tokenCookie);
  // console.log(user);
  req.user = user;
  return next();
}

export function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    // console.log(req.user.role);

    if (!req.user.role || !roles.includes(req.user.role))
      return res.send("UnAuthorized");

    return next();
  };
}

// export function restrictToLoggedInUserOnly(req, res, next) {
//   const userUid = req.cookies.uid;
//   if (!userUid) return res.redirect("/login");
//   const user = getUser(userUid);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// export function checkAuth(req, res, next) {
//   const userUid = req.cookies.uid;
//   const user = getUser(userUid);
//   req.user = user;
//   next();
// }

// export function restrictToLoggedInUserOnly(req, res, next) {
//   const userUid = req.headers["authorization"];
//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// export function checkAuth(req, res, next) {
//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   req.user = user;
//   next();
// }
