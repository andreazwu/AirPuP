import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { thunkGetUserReviews } from "../../store/reviews"
import MyReview from "./MyReview"
import "./Reviews.css"

const LoadUserReviews = () => {

  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.session.user)
  const reviewsObj = useSelector((state) => state.reviews.user) // {1:{x}, 2:{y}, 3:{z}}
  const reviewsArr = Object.values(reviewsObj) // [{x}, {y}, {z}]

  useEffect(() => {
    dispatch(thunkGetUserReviews())
  }, [dispatch, reviewsObj])

  // if (!reviewsArr.length) return null
  if (!currentUser) return <Redirect to="/" />

  return (
    <>
      <div className="myspots-header">
        {
          reviewsArr.length === 0 ?
          (<>
            <h1>My Reviews</h1>
            <h4>You Don't Have Any Reviews!</h4>
          </>):
          <h1>My Reviews</h1>
        }
      </div>

      <div className="wrapper-center">
        <div className="my-reviews-container">
          {
            <div className="my-reviews-wrapper-wrapper">
              <div className="my-reviews-wrapper">
                {reviewsArr.map((review) => (
                  <MyReview key={review.id} review={review} />
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default LoadUserReviews


// user: {
//     [reviewId]: { id, userId, spotId, review, stars,
//                   User: { id, firstName, lastName },
//                   Spot: { id, ownerId, add, city, state, coun,
//                           lat, lng, name, price,
//                           previewImage },
//                   ReviewImages: [ { id, url }, {}, {} ] }
//   }
