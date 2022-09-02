const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const { Op } = require("sequelize");


//-------------------------------------------------------------------
//-------------------------------------------------------------------
const validSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -90 }, { max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -180 }, { max: 180 })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 1 }, { max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Price per day is required"),
  handleValidationErrors
]

const validReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isInt({ min: 1 }, { max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

const validPagination = [
  check("page")
    // .optional()
    .isInt({ min: 1 }, { max: 10 })
    .withMessage("Page must be greater than or equal to 0"),
  check("size")
    // .optional()
    .isInt({ min: 1 }, { max: 20 })
    .withMessage("Size must be greater than or equal to 0"),
  check("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid",),
  check("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid",),
  check("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors
]
//-------------------------------------------------------------------
//-------------------------------------------------------------------


// Get all spots
router.get("/", validPagination, async (req, res) => {
  //query filters:
  let { page, size, minLat, maxLat,
    minLng, maxLng, minPrice, maxPrice } = req.query

  let pagination = {}

  page = parseInt(page)
  size = parseInt(size)

  //isNaN(null) = false; isNaN(undefined) = true
  if (!page || isNaN(page)) page = 1
  if (!size || isNaN(size)) size = 20

  pagination.limit = size
  pagination.offset = size * (page - 1)

  let where = {}

  minLat = parseFloat(minLat)
  maxLat = parseFloat(maxLat)
  minLng = parseFloat(minLng)
  maxLng = parseFloat(maxLng)
  minPrice = parseFloat(minPrice)
  maxPrice = parseFloat(maxPrice)

  if (minLat) where.lat = { [Op.gte]: minLat }
  if (maxLat) where.lat = { [Op.lte]: maxLat }
  if (minLng) where.lng = { [Op.gte]: minLng }
  if (maxLng) where.lng = { [Op.lte]: maxLng }
  if (minPrice) where.price = { [Op.gte]: minPrice }
  if (maxPrice) where.price = { [Op.lte]: maxPrice }


  //get an ARRAY of current users owned spots
  const allSpots = await Spot.findAll({
    where,
    ...pagination
  })


  let spotList = []

  for (let i = 0; i < allSpots.length; i++) {
    const spotObj = allSpots[i].toJSON()

    const rating = await Review.findAll({
      where: { spotId: spotObj.id },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]]
    })

    // spotObj.avgRating = rating[0].toJSON().avgRating
    spotObj.avgRating = Number(parseFloat(rating[0].toJSON().avgRating).toFixed(1))

    const image = await SpotImage.findAll({
      where: {
        [Op.and]: [
          { spotId: spotObj.id },
          { preview: true }
        ]
      },
      attributes: ["url"]
    })

    if (!image.length) {
      spotObj.previewImage = "no image"
    } else {
      spotObj.previewImage = image[0].url //<<<< array
    }
    // spotObj.LALALALALA = image

    spotList.push(spotObj)
  }

  return res.json({
    Spots: spotList,
    page,
    size
  })
})


// Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  //requireAuth ensures (req.user) -- if no current logged in user, err-->err handling
  const { user } = req

  const allSpots = await Spot.findAll({
    where: { ownerId: user.id }
  })

  let spotList = []

  for (let i = 0; i < allSpots.length; i++) {
    const spotObj = allSpots[i].toJSON()

    const rating = await Review.findAll({
      where: { spotId: spotObj.id },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]]
    })

    // spotObj.avgRating = rating[0].toJSON().avgRating //4.3333333333
    spotObj.avgRating = Number(parseFloat(rating[0].toJSON().avgRating).toFixed(1)) //4.3


    const image = await SpotImage.findAll({
      where: {
        [Op.and]: [
          { spotId: spotObj.id },
          { preview: true }
        ]
      },
      attributes: ["url"]
    })

    if (!image.length) {
      spotObj.previewImage = "no image"
    } else {
      spotObj.previewImage = image[0].url
    }

    spotList.push(spotObj)
  }

  return res.json({ Spots: spotList })
})


// Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params

  const spot = await Spot.findByPk(spotId, {
    include: [{
      model: SpotImage,
      attributes: ["id", "url", "preview"]
    }, {
      model: User,
      as: "Owner", //<<<<<<<
      attributes: ["id", "firstName", "lastName"]
    }]
  })

  if (spot) {
    const spotObj = spot.toJSON()

    const numReviews = await Review.count({
      where: { spotId }
    })
    spotObj.numReviews = numReviews

    const rating = await Review.findAll({
      where: { spotId },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]]
    })
    // spotObj.avgRating = rating[0].toJSON().avgRating
    spotObj.avgRating = Number(parseFloat(rating[0].toJSON().avgRating).toFixed(1))

    return res.json(spotObj)

  } else {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
})


// Add an Image to a Spot based on the Spots id
router.post("/:spotId/images", requireAuth, async (req, res) => {

  const { spotId } = req.params
  const { url, preview } = req.body

  const spot = await Spot.findByPk(spotId)

  if (spot) {
    const addedImage = await SpotImage.create({ //<<<<<
      "spotId": spotId,
      "url": url,
      "preview": preview
    })

    const image = await SpotImage.findByPk(addedImage.id, {
      attributes: ["id", "url", "preview"]
    })

    res.status(200)
    return res.json(image)

  } else {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
})


// Create a spot
router.post("/", [validSpot, requireAuth], async (req, res) => {

  const { address, city, state, country,
    lat, lng, name, description, price } = req.body

  try {
    const createSpot = await Spot.create({
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })

    res.status(201)
    return res.json(createSpot)

  } catch (error) {
    res.status(400)
    return res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
      }
    })
  }
})


// Edit a Spot
router.put("/:spotId", [validSpot, requireAuth], async (req, res) => {

  const { address, city, state, country,
    lat, lng, name, description, price } = req.body
  const { spotId } = req.params
  const { user } = req

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(400)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  try {
    if (spot.ownerId !== user.id) {
      res.status(403)
      return res.json({
        "message": "This is NOT your property!!",
        "statusCode": 403
      })
    }

    await spot.update({ //<<<<<< INSTANCE (not capitalized)
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })

    res.status(200)
    return res.json(spot)

  } catch (error) {
    res.status(400);
    return res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
      }
    })
  }
})


// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params
  const { user } = req

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })

  } else {
    if (spot.ownerId !== user.id) {
      res.status(403)
      return res.json({
        "message": "This is NOT your property!!",
        "statusCode": 403
      })
    }

    await spot.destroy()
    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})


//------Reviews-------

// Get all Reviews by a Spot id
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const reviews = await Review.findAll({
    where: { spotId: spotId },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: ReviewImage, attributes: ["id", "url"] }
    ]
  })

  res.json({ Reviews: reviews })
})


// Create a Review for a Spot based on the Spot id
router.post("/:spotId/reviews", [validReview, requireAuth], async (req, res) => {

  const { spotId } = req.params
  const { user } = req
  const { review, stars } = req.body

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const existingReview = await Review.findOne({
    where: {
      userId: user.id,
      spotId: spot.id
    }
  })

  if (existingReview) {
    res.status(403)
    return res.json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }

  const newReview = await Review.create({ //<<<<<<<
    userId: user.id,
    spotId: spotId,
    review,
    stars
  })

  res.json(newReview)
})


//------Bookings-------

// Get all Bookings for a Spot based on the Spot id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const { spotId } = req.params
  const { user } = req

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if (spot.ownerId !== user.id) {
    const notOwnerBooking = await Booking.findAll({
      attributes: ["spotId", "startDate", "endDate"],
      where: {
        spotId: spot.id,
        userId: user.id
      }
    })
    return res.json({ Bookings: notOwnerBooking })

  } else {
    const ownerBookings = await Booking.findAll({
      where: {
        spotId: spotId,
        // userId: user.id
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      }
    })
    return res.json({ Bookings: ownerBookings })
  }
})


// Create a Booking from a Spot based on the Spot id
router.post("/:spotId/bookings", [requireAuth], async (req, res) => {

  const { spotId } = req.params
  const { user } = req
  // const { startDate, endDate } = req.body
  const reqStart = req.body.startDate
  const reqEnd = req.body.endDate

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if (spot.ownerId === user.id) {
    res.status(403)
    return res.json({
      "message": "You shouldn't book your own spot!!",
      "statusCode": 403
    })
  }

  const today = new Date()

  //Date.parse() - # of ms since Jan 1 1970
  if (!reqStart || !reqEnd ||
    Date.parse(reqStart) > Date.parse(reqEnd) ||
    Date.parse(today) > Date.parse(reqStart)) {

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
      spotId,
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

  const newBooking = await Booking.create({
    spotId: spot.id,
    userId: user.id,
    startDate: reqStart,
    endDate: reqEnd
  })

  return res.json(newBooking)
})


module.exports = router;
