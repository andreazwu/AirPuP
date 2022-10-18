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
  }, [dispatch])

  // if (!reviewsArr.length) return null
  if (!currentUser) return <Redirect to="/" />

  return (
    <>
      <div>
        <h1>My reviews</h1>
      </div>

      <div className="wrapper-center">
        <div className="allreviews-container">
          {
            reviewsArr.length === 0 ?

            <div>You don't have any reviews!</div> :

            reviewsArr.map((review) => (
              //implement review in separate component add prop
              <MyReview key={review.id} review={review}>
                {console.log("LOAD USER REVIEWS COMPONENT RETURN:", review)}
              </MyReview>
            ))
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
