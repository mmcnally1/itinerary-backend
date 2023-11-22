const Trip = require('../models/Trip')
const Item = require('../models/Item')
const asyncHandler = require('express-async-handler')

const getTrip = asyncHandler(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: "Trip id is required" });
    }

    const trip = await Trip.findById(id).exec();
    if (!trip) {
        return res.status(204).json({ message: "Trip not found" });
    }

    return res.status(200).json({ trip })
})

// Should be logged in
const createNewTrip = asyncHandler(async (req, res) => {
    const { userId, destination, location, startDate, endDate, description, photos } = req.body;
    if (!userId || !destination, !location) {
        return res.status(400).json({ message: "Missing required data" });
    }

    const duplicate = await Trip.findOne({ userId, destination, startDate, endDate }).exec()
    if (duplicate) {
        return res.status(409).json({ message: "This trip already exists for this user" })
    }

    const tripObject = { userId, destination, location }
    if (startDate) tripObject.startDate = startDate;
    if (endDate) tripObject.endDate = endDate;
    if (description) tripObject.description = description;
    if (photos) tripObject.photos = photos;

    const trip = await Trip.create(tripObject);

    if (trip) {
        return res.status(201).json({ message: `Trip to ${trip.destination} created for user ${trip.userId}`})
    } else {
        res.status(500).json({ message: `An error occurred creating trip to ${trip.destination}` })
    }
})

// Should be logged in
const updateTrip = asyncHandler(async (req, res) => {
    const { tripId, startDate, endDate, description, photos } = req.body;

    if (!tripId) {
        return res.status(400).json({ message: "Trip id is required" });
    }

    const trip = await Trip.findById(tripId).exec();
    if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
    }

    if (startDate) trip.startDate = startDate;
    if (endDate) trip.endDate = endDate;
    if (description) trip.description = description;
    if (photos) trip.photos = photos;

    const updatedTrip = await trip.save();

    return res.status(200).json({ message: `Trip to ${updatedTrip.destination} updated for user ${updatedTrip.userId}`})
})

// Should be logged in
const deleteTrip = asyncHandler(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: "Trip id is required" })
    }

    const deletedTrip = await Trip.findByIdAndDelete(id).exec();
    if (!deletedTrip) {
        return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json({ message: `Trip to ${deletedTrip.destination} deleted for user ${deletedTrip.userId}`});
})

const getItemsByTrip = asyncHandler(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: "Trip id is required "})
    }

    const items = await Item.find({ tripId: id }).exec();
    if (!items) {
        return res.status(204).json({ message: `No items found for trip ${id}` })
    }

    return res.status(200).json({ items })
})

module.exports = {
    getTrip,
    createNewTrip,
    updateTrip,
    deleteTrip,
    getItemsByTrip
}
