import Hotel from "../models/Hotel.js"

//===> CreateHotel || Post
export const createHotel = async (req, res, next) => {
  
  const newHotel = new Hotel(req.body) //===> just similar to => const newHotel = req.body;

  try {
    const savedhotel = await newHotel.save()
    res.status(200).json(savedhotel)
  } catch (err) {
    next(err)
  }
}

//====> UpdateHotel || Put
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //by emplementing this, it will display the current change
    )
    res.status(200).json(updatedHotel)
  } catch (err) {
    next(err);
  }
};

//====> DeleteHotel || Delete
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Hotel has been deleted`);
  } catch (err) {
    next(err);
  }
};

//====> getHotel || get
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

//====> get all Hotels || get
export const getHotels = async (req, res, next) => {

  try {
    const hotels = await Hotel.find()
    res.status(200).json(hotels)
  } catch (err) {
    next(err);
  }
};