const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, ReviewImage, SpotImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const { Op } = require('sequelize');

//-------------------------------------------------------------------
//-------------------------------------------------------------------
// const validBooking = [
//   check('endDate')
//     .exists({ checkFalsy: true })
//     .withMessage('endDate is required')
//     .isAfter('startDate')
//     .withMessage('endDate cannot be on or before startDate'),
//   handleValidationErrors
// ]
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
router.put("/:bookingId", requireAuth, async (req, res) => {

  const { bookingId } = req.params
  const { user } = req
  // const { startDate, endDate } = req.body
  const reqStart = req.body.startDate
  const reqEnd = req.body.endDate

  const booking = await Booking.findByPk(bookingId)

  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }

  if (booking.userId !== user.id) {
    res.status(403)
    return res.json({
      "message": "This is NOT your booking!!",
      "statusCode": 403
    })
  }

  const today = new Date()

  //Date.parse() - # of ms since Jan 1 1970
  if (Date.parse(today) > Date.parse(reqEnd)) {
    res.status(403)
    return res.json({
      "message": "Past bookings can't be modified",
      "statusCode": 403
    })
  }

  if (!reqStart || !reqEnd || Date.parse(reqStart) > Date.parse(reqEnd)) {
    res.status(400)
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }

  const conflictBooking = await Booking.findOne({
    where: {
      [Op.or]: [
        //conflict start falls b/t reqStart and reqEnd
        { startDate: { [Op.between]: [reqStart, reqEnd] } },
        //conflict end falls b/t reqStart and reqEnd
        { endDate: { [Op.between]: [reqStart, reqEnd] } },
        //whole conflict period envelops (reqStart and reqEnd) period
        {
          startDate: { [Op.lte]: reqStart },
          endDate: { [Op.gte]: reqEnd }
        },
        //whole conflict period falls b/t reqStart and reqEnd
        {
          startDate: { [Op.gte]: reqStart },
          endDate: { [Op.lte]: reqEnd }
        }
      ]
    }
  })

  if (conflictBooking) {
    res.status(403)
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }

  const newBooking = await booking.update({ //<<<<<< INSTANCE (not capitalized)
    startDate: reqStart,
    endDate: reqEnd
  })

  return res.json(newBooking)
})


// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const { bookingId } = req.params
  const { user } = req

  const booking = await Booking.findByPk(bookingId, {
    include: { model: Spot } //if current user is the owner of the spot
  })

  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }

  if (booking.userId !== user.id && booking.Spot.ownerId !== user.id) {
    res.status(403)
    return res.json({
      "message": "You do not have access to this booking",
      "statusCode": 403
    })
  }

  const today = new Date()

  if (Date.parse(today) > Date.parse(booking.startDate)) {
    res.status(403)
    return res.json({
      "message": "Bookings that have been started can't be deleted",
      "statusCode": 403
    })
  }

  await booking.destroy()

  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})


module.exports = router;
