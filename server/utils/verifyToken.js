import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// verification
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; //===> to summarize, you created this at your login state => check auth.js & login for info

  if(!token) {
    return next(createError(401, "You are not authenticated"))
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return next(createError(403, "Token is Invalid"));
    req.user = user;
    next();
  })
}

//===> I did a little bit of research, and discover that cookie authorization & header athorization, has it's diffent concept //===
    //====> the reason this project was created using a cookie || req.cookies.access_token => is that it doesn't allow client to have access ==
              //=======> on it, hoping it you could wonder this serquence, take note that this MERN has a Admin side

// userverification
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if(req.user.id === req.params.id || req.user.isAdmin) { //==> admin has the ability to update or remove user, with out any condition
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  })
}

// verifyAdmin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if(req.user.isAdmin) { //==> admin has the ability to update or remove user, with out any condition || but it requires isAdmin to be true
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  })
}