const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, ReviewImage, SpotImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const { Op } = require('sequelize');

//-------------------------------------------------------------------
//-------------------------------------------------------------------
const validBooking = [
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('endDate is required')
    .isAfter('startDate')
    .withMessage('endDate cannot be on or before startDate'),
  handleValidationErrors
]
//-------------------------------------------------------------------
//-------------------------------------------------------------------


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {

  const { user } = req

  const bookings = await Booking.findAll({
    where: { userId: user.id },
    include: {
      model: Spot,
      attributes: { exclude: ["description", "createdAt", "updatedAt"] },
      include: {
        model: SpotImage,
        attributes: ["url"],
        where: {
          preview: true
        }
      }
    }
  })

  let bookingList = []

  for (let i = 0; i < bookings.length; i++) {
    const bookingObj = bookings[i].toJSON()

    if (!bookingObj.Spot.SpotImages) {
      bookingObj.Spot.previewImage = "no image"
    } else {
      bookingObj.Spot.previewImage = bookingObj.Spot.SpotImages[0].url
    }

    delete bookingObj.Spot.SpotImages //<<<<<<

    bookingList.push(bookingObj)
  }

  return res.json({ Bookings: bookingList })
})


// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {

})


// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {


})






module.exports = router;
