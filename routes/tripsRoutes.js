const express = require('express')
const router = express.Router()
const tripsController = require('../controllers/tripsController')

router.route('/')
    .get(tripsController.getTrip)
    .post(tripsController.createNewTrip)
    .patch(tripsController.updateTrip)
    .delete(tripsController.deleteTrip)

router.route('/items/')
    .get(tripsController.getItemsByTrip)

module.exports = router