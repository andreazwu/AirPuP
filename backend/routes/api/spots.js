const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, SpotImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const { Op } = require('sequelize');


// Get all spots
// id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, >>>previewImage, and >>>avgRating
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    // include: [
    //   { model: Review, attributes: [] },
    //   { model: SpotImage, attributes: [["url", "previewImage"], where: { preview: true } }
    // ],
    // attributes: {
    //   include: [
    //     [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
    //   ]
    // }
  })
  return res.json(spots)
})


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  //requireAuth ensures (req.user) -- if no current logged in user, err-->err handling
  const currentUser = req.user

  //get an ARRAY of current user's owned spots
  const currentSpots = await Spot.findAll({
    where: {
      ownerId: currentUser.id
    }
  })

  for (let spot of currentSpots) {


    //avgRating
    const rating = await Review.findAll({
      where: { spotId: spot.id },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
      ]
    })

    //previewImage
    const preview = await SpotImage.findAll({
      where: {
        spotId: spot.id,
        preview: true
      },
      attributes: [
        ["url", "previewImage"]
      ],
      limit: 1
    })

    spot = spot.toJSON()
    spot.avgRating = rating
    spot.previewImage = preview
  }

  return res.json(currentSpots)
})



// Create a Spot
// Creates and returns a new spot.

//  An authenticated user is required for a successful response
//  New spot exists in the database after request
//  Spot data returned includes the id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, and updatedAt
//  Error response with status 400 is given when body validations for the address, city, state, country, lat, lng, name, description, or price are violated
router.post("/")



module.exports = router;
