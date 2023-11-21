const Item = require('../models/Item')
const asyncHandler = require('express-async-handler')

const getItem = asyncHandler(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: "Item id is required" });
    }
    
    const item = await Item.findById(id).exec();
    if (!item) {
        return res.status(404).json({ message: "item not found" });
    }

    return res.status(200).json({ item })
})

const createNewItem = asyncHandler(async (req, res) => {
    const { tripId, destination, location, startDate, endDate, description, photos } = req.body;
    if (!tripId || !destination, !location) {
        return res.status(400).json({ message: "Missing required data" });
    }

    const duplicate = await Item.findOne({ tripId, destination, startDate, endDate }).exec()
    if (duplicate) {
        return res.status(409).json({ message: "This item already exists for this trip" })
    }

    const itemObject = { tripId, destination, location }
    if (startDate) itemObject.startDate = startDate;
    if (endDate) itemObject.endDate = endDate;
    if (description) itemObject.description = description;
    if (photos) itemObject.photos = photos;

    const item = await Item.create(itemObject);

    if (item) {
        return res.status(201).json({ message: `item to ${item.destination} created for trip ${item.tripId}`})
    } else {
        res.status(400).json({ message: 'Invalid item data received' })
    }
})

const updateItem = asyncHandler(async (req, res) => {
    const { itemId, startDate, endDate, description, photos } = req.body;

    if (!itemId) {
        return res.status(400).json({ message: "Item id is required" });
    }

    const item = await Item.findById(itemId).exec();
    if (!item) {
        return res.status(404).json({ message: "item not found" });
    }

    if (startDate) item.startDate = startDate;
    if (endDate) item.endDate = endDate;
    if (description) item.description = description;
    if (photos) item.photos = photos;

    const updatedItem = await item.save();

    return res.status(201).json({ message: `item to ${updatedItem.destination} updated for trip ${updatedItem.tripId}`})
})

const deleteItem = asyncHandler(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: "Item id is required" })
    }

    const deletedItem = await Item.findByIdAndDelete(id).exec();
    if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
    }

    return res.status(201).json({ message: `Item to ${deletedItem.destination} deleted for user ${deletedItem.userId}`});
})

module.exports = {
    getItem,
    createNewItem,
    updateItem,
    deleteItem
}