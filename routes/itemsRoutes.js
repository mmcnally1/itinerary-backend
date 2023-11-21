const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/itemsController')

router.route('/')
    .get(itemsController.getItem)
    .post(itemsController.createNewItem)
    .patch(itemsController.updateItem)
    .delete(itemsController.deleteItem)

module.exports = router