const User = require('../models/User')
const Trip = require('../models/Trip')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getUser = asyncHandler(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(400).json({ message: "User id is required" });
    }

    const user = await User.findById(req.query.id).exec();
    if (!user) {
        return res.status(204).json({ message: "User not found" })
    }

    return res.status(200).json({ user });
})

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec()
    if (duplicateUsername) {
        return res.status(409).json({ message: 'Username is already taken' })
    }

    const duplicateEmail = await User.findOne({ email }).lean().exec()
    if (duplicateEmail) {
        return res.status(409).json({ message: 'An account associated with this email address already exists' })
    }


    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = { username, "password": hashedPwd, email }

    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(500).json({ message: `An error occurred creating ${username}` })
    }
})

// Should only be allowed if user is logged in
const updateUser = asyncHandler(async (req, res) => {
    const { id, password, email, bio, savedTrips, profilePic } = req.body;
    if (!id) return res.status(400).json({ message: "User id is required" })

    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    if (username) {
        const duplicate = await User.findOne({ username });
        if (duplicate && duplicate?._id.toString() !== id) {
            return res.status(409).json({ message: 'Username is already taken' })
        }
    }

    if (email) {
        const duplicate = await User.findOne({ email });
        if (duplicate && duplicate?._id.toString() !== id) {
            return res.status(409).json({ message: 'Email is already taken' })
        }
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (profilePic) user.profilePic = profilePic;
    if (savedTrips) user.savedTrips = savedTrips;
    if (password) user.password = await bcrypt.hash(password, 10);

    const updatedUser = await user.save();

    res.status(200).json({ message: `${updatedUser.username} updated`})
})

// Should only be allowed if user is logged in
const deleteUser = asyncHandler(async (req, res) => {
    // delete user from database and delete related session data
})

const getTripsByUser = asyncHandler(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: "User Id is required" });
    }

    const trips = await Trip.find({ userId: id }).exec();
    if (!trips) {
        return res.status(204).json({ message: "No trips found for this user" });
    }

    return res.status(200).json({ trips })
})

module.exports = {
    getUser,
    createNewUser,
    updateUser,
    deleteUser,
    getTripsByUser
}
