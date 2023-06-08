import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const port = 9000;

//=====> Configuration <=====//
const app = express();
dotenv.config();

// connect to db
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log(`Connected to mongoDb`);
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

mongoose.connection.on("disconnected", () => { //good form identifying if your mongodb is terminated || you can also set this to connected
  console.log(`Disconnected to MongoDb`);
})

//=====> Api routes <=====//
app.get('/', (req, res) => {
  res.send(`Hellow`)
})

//=====> middlewares <=====//
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

//=====> error handler <=====// 
app.use((err, req, res, next) => {  //===> I just realize that, app.use has 4 parameter, & it should be align just like this
  const errorStatus = err.status || 500;              //====> Also to use this, you need to call next() at your ex. at the controller
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack, //give more details, but it's so huge, but it will be a good and easy fix someday
  });
});

app.listen(port, () => {
  connect();
  console.log(`Server is listening to port, Over ${port}...!`);
})