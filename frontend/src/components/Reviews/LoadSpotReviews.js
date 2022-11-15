import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { thunkGetSpotReviews } from "../../store/reviews"

import "./Reviews.css"


const LoadSpotReviews = ({spotId}) => {
  // console.log("1 (2.2) COMPONENT-LOADSPOTREVIEWS STARTS")

  const dispatch = useDispatch()

  const reviewsObj = useSelector((state) => {
    // console.log("2 (2.1/3) USE SELECTOR RUNNING: DETECTS CHANGES IN STATE")
    return state.reviews.spot
  })

  const reviewsArr = Object.values(reviewsObj)

  useEffect(() => {
    // console.log("5 USE EFFECT RUNNING: DISPATCH THUNK")
    dispatch(thunkGetSpotReviews(+spotId))
  }, [dispatch, reviewsObj]) //<<<<<<<

  // console.log("3 (2.4) THIS IS THE CURRENT SPOTREVIEWS RECEIVED FROM USE SELECTOR:", reviewsObj, "ARRAY:", reviewsArr)


  if (!reviewsArr.length) return null

  return (
    <>
    {
      /* [{},{}], each {} is:
      { id, userId, spotId, review, stars,
        User: { id, firstName, lastName },
        ReviewImages: [ { id, url }, {}, {} ] }
      */
      reviewsArr.map((review) => (
        <div className="single-review">
          <h3>{review.User.firstName}{" "}{review.User.lastName}</h3>
          <p className="single-review-date">
            {new Date(review.createdAt).toString().slice(3,-42)}
          </p>

          <p className="single-review-stars">
            {
              [...Array(review.stars)].map((star) => (<i className="fa-solid fa-star"></i>))
            }
          </p>

          <p className="single-review-review">
            <i className="fa fa-quote-left fa-lg" aria-hidden="true"></i>
            <span>
              {review.review}
            </span>
            <i className="fa fa-quote-right fa-lg" aria-hidden="true"></i>
          </p>
          <div>
            {
              review.ReviewImages &&
              review.ReviewImages.map((image) => {
                return (
                  <img
                  className="single-review-image"
                  src={image.url} />
                )
              })
            }
          </div>
        </div>
      ))
    }
    </>
  )
}

export default LoadSpotReviews
