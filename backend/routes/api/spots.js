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
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 1, max: 50 })
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
//-------------------------------------------------------------------
//-------------------------------------------------------------------


// Get all spots
router.get("/", async (req, res) => {
  let { size, page } = req.query

  if (!page) page = 1
  if (!size) size = 20

  page = parseInt(page);
  size = parseInt(size);

  const pagination = {}

  if (page >= 1 && size >= 1) {
    pagination.limit = size
    pagination.offset = size * (page - 1)

  }

  //get an ARRAY of current users owned spots
  const allSpots = await Spot.findAll({
    ...pagination
  })

  let spotList = []

  for (let i = 0; i < allSpots.length; i++) {
    const spotObj = allSpots[i].toJSON()

    const rating = await Review.findAll({
      where: { spotId: spotObj.id },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]]
    })

    spotObj.avgRating = rating[0].toJSON().avgRating

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

// Question re: eager-loading - notes


// Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  //requireAuth ensures (req.user) -- if no current logged in user, err-->err handling
  const { user } = req

  const allSpots = await Spot.findAll({
    where: {
      ownerId: user.id
    }
  })

  let spotList = []

  for (let i = 0; i < allSpots.length; i++) {
    const spotObj = allSpots[i].toJSON()

    const rating = await Review.findAll({
      where: { spotId: spotObj.id },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]]
    })

    spotObj.avgRating = rating[0].toJSON().avgRating

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
//"numReviews", "avgStarRating", "SpotImages", "Owner"
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
    spotObj.avgRating = rating[0].toJSON().avgRating

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


//create a spot
//id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, and updatedAt
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

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(400)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  try {
    await spot.update({ //<<<<<<
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
router.delete('/:spotId', restoreUser, requireAuth, async (req, res, next) => {
  const { spotId } = req.params

  const deleteSpot = await Spot.findByPk(spotId)

  if (!deleteSpot) {
    res.statusCode = 404,
      res.json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }

  await deleteSpot.destroy()
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })

})


module.exports = router;
