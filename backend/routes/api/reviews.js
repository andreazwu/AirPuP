const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Booking, Review, ReviewImage, SpotImage, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const { Op } = require("sequelize");


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
      "message": "This is NOT your review!!",
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

// // Edit a Review
// router.put("/:reviewId", requireAuth, validateReview, async (req, res, next) => {
//   const userReview = await Review.findByPk(req.params.reviewId);
//   if (userReview) {
//     if (userReview.userId === req.user.id) {
//       const { review, stars } = req.body

//       if (review) userReview.review = review
//       if (stars) userReview.stars = stars
//       await userReview.save()

//       res.json(userReview)
//     }

//     // if review does not belong to current user
//     else res.status(401).json({
//       message: "Unauthorized user",
//       statusCode: 401
//     })
//   }

//   // if review not found
//   else res.status(404).json({
//     message: "Review couldn't be found",
//     statusCode: 404
//   })
// })

// // Delete a Review
// router.delete("/:reviewId", requireAuth, async (req, res, next) => {
//   const review = await Review.findByPk(req.params.reviewId);
//   if (review) {
//     if (review.userId === req.user.id) {
//       await review.destroy()

//       res.json({
//         message: "Successfully deleted",
//         statusCode: 200
//       })
//     }

//     // if review does not belong to current user
//     else res.status(401).json({
//       message: "Unauthorized user",
//       statusCode: 401
//     })
//   }

//   // if review not found
//   else res.status(404).json({
//     message: "Review couldn't be found",
//     statusCode: 404
//   })
// })




module.exports = router;
