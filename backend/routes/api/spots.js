const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const { Op } = require('sequelize');

//-------------------------------------------------------------------
//-------------------------------------------------------------------

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is required')
    .isLength({ min: -90, max: 90 })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is required')
    .isLength({ min: -180, max: 180 })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isLength({ max: 49 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
]

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars is required')
    .isLength({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

const validateBooking = [
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('endDate is required')
    .isAfter('startDate')
    .withMessage('endDate cannot be on or before startDate'),
  handleValidationErrors
]

const checkValidate = [
  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be greater than or equal to 0"'),
  check('size')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Size must be greater than or equal to 0'),
  check('maxLat')
    .optional()
    .isDecimal()
    .withMessage('Maximum latitude is invalid'),
  check('minLat')
    .optional()
    .isDecimal()
    .withMessage('Minimum latitude is invalid'),
  check('minLng')
    .optional()
    .isDecimal()
    .withMessage('Maximum longitude is invalid'),
  check('maxLng')
    .optional()
    .isDecimal()
    .withMessage('Minimum longitude is invalid'),
  check('minPrice')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0'),
  handleValidationErrors
]
//-------------------------------------------------------------------
//-------------------------------------------------------------------

// // Get all spots
// // id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, >>>previewImage, and >>>avgRating

// // Get all Spots owned by the Current User
// router.get('/', async (req, res) => {
//   //get an ARRAY of current user's owned spots
//   const allSpots = await Spot.findAll()

//   let spotsInfo = []

//   for (let spot of allSpots) {

//     //avgRating
//     const rating = await Review.findAll({
//       where: { spotId: spot.id },
//       attributes: [
//         [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
//       ]
//     })

//     //previewImage
//     const preview = await SpotImage.findAll({
//       where: {
//         spotId: spot.id,
//         preview: true
//       },
//       attributes: [
//         ["url", "previewImage"]
//       ],
//       limit: 1
//     })

//     data = {
//       ...spot.dataValues,
//       avgRating: rating[0].avgRating,
//       previewImage: preview[0].previewImage
//     }

//     spotsInfo.push(data)
//   }

//   return res.json({
//     Spots: spotsInfo
//   })
// })

// // get all spots
// // eager loading (doesn't work)

router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      { model: Review, attributes: [] },
      { model: SpotImage, attributes: ["url", "previewImage"], where: { preview: true } }
    ],
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
      ]
    }
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

  let spotsInfo = []

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

    // spot.dataValues.avgRating = rating
    // spot.dataValues.previewImage = preview

    data = {
      ...spot.dataValues,
      avgRating: rating[0].avgRating,
      previewImage: preview[0].previewImage
    }

    spotsInfo.push(data)
  }

  return res.json({
    Spots: spotsInfo
  })
})


// Get details of a Spot from an id
// id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, and updatedAt
//"numReviews", "avgStarRating", "SpotImages", "Owner"

router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params

  const spotById = await Spot.findByPk(spotId, {
    include: [
      { model: SpotImage, attributes: ["id", "url", "preview"] },
      { model: User, attributes: ["id", "firstName", "lastName"] }
    ]
  })

  if (!spotById) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  } else {
    const numReviews = await Review.count({ where: { spotId } })
    const avgRating = await Review.findAll({
      where: { spotId },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]]
    })
  }



})












// Create a Spot
// Creates and returns a new spot.

//  An authenticated user is required for a successful response
//  New spot exists in the database after request
//  Spot data returned includes the id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, and updatedAt
//  Error response with status 400 is given when body validations for the address, city, state, country, lat, lng, name, description, or price are violated
router.post("/")



module.exports = router;
