const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, ReviewImage, SpotImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const { Op } = require('sequelize');



// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {

})


// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {

})


// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {


})






module.exports = router;
