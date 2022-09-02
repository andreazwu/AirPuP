const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Booking, Review, ReviewImage, SpotImage, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const { Op } = require("sequelize");



router.delete('/:imageId', requireAuth, async (req, res) => {
  const { imageId } = req.params
  const { user } = req

  const image = await ReviewImage.findByPk(imageId, {
    include: {
      model: Review
    }
  })

  if (!image) {
    res.status(404)
    return res.json({
      "message": "Review Image couldn't be found",
      "statusCode": 404
    })
  }

  if (image.Review.userId !== user.id) {
    res.status(403)
    return res.json({
      "message": "Forbidden. This is NOT your review!!",
      "statusCode": 403
    })
  }

  await image.destroy()

  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})







module.exports = router;
