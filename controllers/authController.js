const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const login = asyncHandler(async (req, res) => {

})

const refresh = asyncHandler(async (req, res) => {

})

const logout = asyncHandler(async (req, res) => {

})

module.exports = {
    login,
    refresh,
    logout
}