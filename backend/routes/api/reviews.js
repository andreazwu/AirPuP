const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Booking, Review, ReviewImage, SpotImage, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const { Op } = require("sequelize");


//-------------------------------------------------------------------
//-------------------------------------------------------------------
const validReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]
//-------------------------------------------------------------------
//-------------------------------------------------------------------


// Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req

  const reviews = await Review.findAll({
    where: { userId: user.id },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: ReviewImage, attributes: ["id", "url"] },
      {
        model: Spot,
        attributes: { exclude: ["description", "createdAt", "updatedAt"] },
        include: {
          model: SpotImage,
          attributes: ["url"],
          where: {
            preview: true
          }
        }
      }]
  })

  let reviewList = []

  for (let i = 0; i < reviews.length; i++) {
    const reviewObj = reviews[i].toJSON()

    if (!reviewObj.Spot.SpotImages) {
      reviewObj.Spot.previewImage = "no image"
    } else {
      reviewObj.Spot.previewImage = reviewObj.Spot.SpotImages[0].url
    }

    delete reviewObj.Spot.SpotImages //<<<<<<

    reviewList.push(reviewObj)
  }

  return res.json({ Reviews: reviewList })
})



// Add an Image to a Review based on the Reviews id
router.post("/:reviewId/images", requireAuth, async (req, res) => {

  const { reviewId } = req.params
  const { user } = req
  const { url } = req.body

  const review = await Review.findByPk(reviewId)

  if (!review) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  if (review.userId !== user.id) {
    res.status(403)
    return res.json({
      "message": "Forbidden. This is NOT your review!!",
      "statusCode": 403
    })
  }

  const count = await ReviewImage.count({
    where: { reviewId: review.id }
  })

  if (count > 10) {
    res.status(403)
    return res.json({
      "message": "Maximum number of images for this resource was reached",
      "statusCode": 403
    })
  }

  const newReviewImage = await ReviewImage.create({
    url,
    reviewId: review.id
  })

  const reviewImage = await ReviewImage.findByPk(newReviewImage.id, {
    attributes: ["id", "url"]
  })

  return res.json(reviewImage)
})




// Edit a Review
router.put("/:reviewId", [requireAuth, validReview], async (req, res) => {

  const { review, stars } = req.body
  const { reviewId } = req.params
  const { user } = req

  const editReview = await Review.findByPk(reviewId)

  if (!editReview) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  if (editReview.userId !== user.id) {
    res.status(403)
    return res.json({
      "message": "Forbidden. This is NOT your review!!",
      "statusCode": 403
    })
  }

  try {
    await editReview.update({ review, stars }) //<<<<<<
    return res.json(editReview)

  } catch (error) {
    res.status(400)
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    })
  }
})



// Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params
  const { user } = req

  const deleteReview = await Review.findByPk(reviewId)

  if (!deleteReview) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  if (deleteReview.userId !== user.id) {
    res.status(403)
    return res.json({
      "message": "Forbidden. This is NOT your review!!",
      "statusCode": 403
    })
  }

  await deleteReview.destroy()

  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})



module.exports = router;
