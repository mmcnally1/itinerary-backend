const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
    {
        tripId: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        location: {
            type: [Number],
            required: true
        },
        startDate: Date,
        endDate: Date,
        description: String,
        photos: {
            type: [String],
            default: []
        }
    }
)

module.exports = mongoose.model('Item', itemSchema)