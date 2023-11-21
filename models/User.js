const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        bio: String,
        profilePic: String,
        savedTrips: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        }
    }
)

module.exports = mongoose.model('User', userSchema)