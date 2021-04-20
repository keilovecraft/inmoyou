'use strict'

var express = require('express');
var AdvertisementController = require('../controllers/advertisement');

var router = express.Router();

router.post('/save-advertisement', AdvertisementController.saveAdvertisement);
router.get('/advertisements', AdvertisementController.getAdvertisements);
router.get('/advertisement/:id?', AdvertisementController.getAdvertisement);
router.put('/advertisement/:id', AdvertisementController.updateAdvertisement);
router.delete('/advertisement/:id', AdvertisementController.deleteAdvertisement);

module.exports = router;
