import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

//====> Create room
export const createRoom = async (req, res, next) => {

  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body); // the new keyword, will impact to the "Room > model"

  try {
    const savedRoom = await newRoom.save(); //==> the concept of this is that we will save it to the => "rooms" at the Hotel.js
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },  //==> $push is a method in mongoDb, that allows us to push any item inside to an array => "rooms"
      });                 // then we will saveRoom._id => because it is now inside the MongoDb
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

//====> updateRoom || Put
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //by emplementing this, it will display the current change
    )
    res.status(200).json(updatedRoom)
  } catch (err) {
    next(err);
  }
};

//====> DeleteRoom || Delete
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id); //==> take note that this takes double params
    try {
      await Hotel.findByIdAndUpdate(hotelId, { //==> take note that this takes double params
        $pull: { rooms: req.params.id },  //==> $pull is one of the mongodb method, which pull specific item
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

//====> getRoom || get
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

//====> get all Rooms || get
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()
    res.status(200).json(rooms)
  } catch (err) {
    next(err);
  }
};