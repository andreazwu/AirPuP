import { csrfFetch } from './csrf';

//---------------------------------------------------
// ACTION TYPES:
const LOAD_SPOT_REVIEWS = "REVIEWS/LOAD_SPOT_REVIEWS"
const LOAD_USER_REVIEWS = "REVIEWS/LOAD_USER_REVIEWS"
const CREATE_REVIEW = "REVIEWS/CREATE_REVIEW"
const UPDATE_REVIEW = "REVIEWS/UPDATE_REVIEW"
const DELETE_REVIEW = "REVIEWS/DELETE_REVIEW"
const ADD_REVIEW_IMAGE = "REVIEWS/ADD_REVIEW_IMAGE"


//---------------------------------------------------
// ACTION CREATORS:
const acLoadSpotReviews = (reviews) => {
  return {
    type: LOAD_SPOT_REVIEWS,
    reviews
  }
}

const acLoadUserReviews = (reviews) => {
  return {
    type: LOAD_USER_REVIEWS,
    reviews
  }
}

const acCreateReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

const acUpdateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
      }
    }

const acDeleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

const acAddReviewImage = (image) => {
  console.log("ACTION CREATOR ADD REVIEW IMAGE, PAYLOAD:", image)
  return {
    type: ADD_REVIEW_IMAGE,
    image
  }
}

//---------------------------------------------------
// THUNK ACs:
// load all spot reviews thunk
export const thunkGetSpotReviews = (spotId) => async (dispatch) => {
  console.log("THUNK STARTS RUNNING, BEFORE FETCH FROM BACKEND")
  const response = await csrfFetch(`api/spots/${spotId}/reviews`)
  console.log("THUNK STARTS RUNNING, AFTER FETCH FROM BACKEND")

  if (response.ok) {
    console.log("THUNK, BEFORE DISPATCH ACTION CREATOR")
    // {
    //   "Reviews": [
    //     {
    //       "id": 1,
    //       "userId": 1,
    //       "spotId": 1,
    //       "review": "This was an awesome spot!",
    //       "stars": 5,
    //       "User": {"id":, "firstName":, "lastName": },
    //       "ReviewImages": [{"id": ,"url": }, {}, {}],
    //     }
    //   ]
    // }
    const data = await response.json() //object
    const reviewsArr = data.Reviews //array [{}, {}]
    dispatch(acLoadSpotReviews(reviewsArr))
    console.log("THUNK, AFTER DISPATCH ACTION CREATOR -- CYCLE ENDS")
    return data
  }
}

// // load all user reviews thunk
// export const thunkGetUserReviews = () => async (dispatch) => {
//   const response = await csrfFetch("/api/reviews/current")
//   if (response.ok) {
//     const reviews = await response.json() //array
//     dispatch(acLoadUserreviews(reviews))
//   }
// }

// // create new review thunk
// export const thunkCreateNewReview = (newreview) => async (dispatch) => {
//   console.log("THUNK CREATEreview STARTS RUNNING, BEFORE POST TO BACKEND")
//   const response = await csrfFetch("/api/reviews", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(newreview)
//   })
//   console.log("THUNK CREATEreview STARTS RUNNING, AFTER POST TO BACKEND")

//   if (response.ok) {
//     const newreview = await response.json()
//     console.log("THUNK CREATEreview BEFORE DISPATCH AC")

//     dispatch(acCreateReview(newreview))
//     console.log("THUNK CREATEreview AFTER DISPATCH AC")

//     return newreview //<<<<<< must return (for reviewform line 67) handlesubmit: newreview = await dispatch(thunkCreateNewreview(review))
//   } else {
//     //come back and do error handling logic <<<<<<<
//     const data = await response.json()
//     console.log(data)
//   }
// }

// // update review thunk
// export const thunkEditreview = (myreview, reviewId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: "PUT",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(myreview)
//   })

//   if (response.ok) {
//     const review = await response.json()
//     dispatch(acUpdatereview(review))
//     return review
//   }
// }

// // delete review thunk
// export const thunkRemoveReview = (reviewId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: "DELETE"
//   })

//   if (response.ok) {
//     dispatch(acDeleteReview(reviewId))
//   }
// }

// // add image thunk
// export const thunkAddReviewImage = (reviewId, imageObj) => async (dispatch) => {
//   console.log("THUNK ADDreviewIMAGE STARTS RUNNING, BEFORE POST TO BACKEND")
//   const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify (
//       imageObj
//     )
//   })
//   console.log("THUNK ADDreviewIMAGE STARTS RUNNING, AFTER FETCH FROM BACKEND, RES:", response)

//   if (response.ok) {
//     console.log("THUNK ADDreviewIMAGE, BEFORE DISPATCH ACTION CREATOR (add review image)")
//     const image = await response.json()
//     dispatch(acAddReviewImage(image))
//     console.log("THUNK ADDreviewIMAGE, AFTER DISPATCH ACTION CREATOR -- CYCLE ENDS")
//     return image
//   }
// }


//---------------------------------------------------
// REDUCER:

const initialState = {
  spot:{},
  user:{}
}

// reviews: {
//   spot: {
//     [reviewId]: { id, userId, spotId, review, stars,
//                   User: { id, firstName, lastName },
//                   ReviewImages: [ { id, url }, {}, {} ] }
//   },
//   user: {
//     [reviewId]: { id, userId, spotId, review, stars,
//                   User: { id, firstName, lastName },
//                   Spot: { id, ownerId, add, city, state, coun,
//                           lat, lng, name, price,
//                           previewImage },
//                   ReviewImages: [ { id, url }, {}, {} ] }
//   }
// }

const reviewsReducer = (state = initialState, action) => {
  let newState
  switch (action.type){
    case LOAD_SPOT_REVIEWS:
      console.log("REVIEWSREDUCER LOAD SPOT REVIEWS BEGIN:", state)
      newState = {...state}
      const normalizedReviews = {}
      //payload = reviews = [{}, {}]
      action.reviews.forEach((review) => normalizedReviews[review.id] = review)
      newState.spot = normalizedReviews
      console.log("REVIEWSREDUCER LOAD SPOT REVIEWS BEGIN:", newState)
      return newState
    default:
      return state
  }
}


export default reviewsReducer
