const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema(
    {
        userId: {
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
        },
    }
)

module.exports = mongoose.model('Trip', tripSchema)