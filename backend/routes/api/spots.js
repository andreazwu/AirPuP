const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, SpotImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const { Op } = require('sequelize');


// Get all spots
// id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, >>>previewImage, and >>>avgRating
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    // include: [
    //   { model: Review, attributes: [] },
    //   { model: SpotImage, attributes: ["url"], where: { preview: true } }
    // ],
    // attributes: {
    //   include: [
    //     [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
    //   ]
    // }
  })
  return res.json(spots)
});


module.exports = router;
