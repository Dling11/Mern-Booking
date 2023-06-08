import User from "../models/User.js";
import bcrypt from "bcryptjs"; //==> just to clarify xD bcrypt and bcryptjs is not the same but still has same functionality xD
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//===> register || post
export const register = async (req, res, next) => {

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt); // you can also destructure this if u want, => "const { name, password } = req.body"

    const newUser = new User({ //==> again similar to "const newUser = req.body"
      username: req.body.username,
      email: req.body.email,
      password: hash, //===> send hash to your database
    });

    await newUser.save();
    res.status(201).send('User has been Created...')

  } catch (error) {
    next(error);
  }
}

//===> login || post
export const login = async (req, res, next) => {

  try {

    // find user in the database
    const user = await User.findOne({ username: req.body.username }); //=> hey rowell fon't forget to create a user & password error indicator
    if(!user) return next(createError(404, "User Not Found"));

    // compare password
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect) return next(createError(400, "Password or Username"));

    // give token
    const token = jwt.sign({ id:user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET)//create a code in terminal => openssl rand -base64 32

    // only returns the specfic data to the frontend
    const { password, isAdmin, ...otherDetails } = user._doc    //"user._doc" is the object path, from the request so that it only send other details, except for the "password & isAdmin"
    res.cookie("access_token", token, {
      httpOnly: true, //the main reason of this is that, it doesn't allow clients to reach this cookie || remember this is only for admin
    })
    .status(200)
    .json({ ...otherDetails });

  } catch (error) {
    next(error);
  }
}