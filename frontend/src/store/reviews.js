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
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
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

// load all user reviews thunk
export const thunkGetUserReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current")
  if (response.ok) {
    /*
    {"Reviews": [
      {
        "id": 1,
        "userId": 1,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
        "User": {"id":, "firstName":, "lastName": },
        "Spot": { id, ownerId, add, city, state, coun, lat, lng,    name, price, previewImage: url },
        "ReviewImages": [{"id": ,"url": }, {}, {}]
      }
    ]}
    */
    const data = await response.json() //object
    const reviewsArr = data.Reviews //array [{}, {}]
    dispatch(acLoadUserReviews(reviewsArr))
    return data
  }
}

// create new review thunk
export const thunkCreateNewReview = (newreview, spotId, user) => async (dispatch) => {
  console.log("THUNK CREATEREVIEW STARTS RUNNING, BEFORE POST TO BACKEND")
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newreview)
  })
  console.log("THUNK CREATEREVIEW STARTS RUNNING, AFTER POST TO BACKEND")

  if (response.ok) {
    /* response from backend: "newreview"
      {
        "id": 1,
        "userId": 1,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      }
    */

// vs. structure in reducer state:
//   spot: {
//     [reviewId]: { id, userId, spotId, review, stars,
//                   User: { id, firstName, lastName },
//                   ReviewImages: [ { id, url }, {}, {} ] }
//   }

    const newreview = await response.json()

    const userInfo = {}
    userInfo.id = user.id
    userInfo.firstName = user.firstName
    userInfo.lastName = user.lastName

    newreview.User = userInfo
    newreview.ReviewImages = []

    console.log("THUNK CREATEreview BEFORE DISPATCH AC")
    dispatch(acCreateReview(newreview))
    console.log("THUNK CREATEreview AFTER DISPATCH AC")

    return newreview //<<<<<< must return for handlesubmit: newreview = await dispatch(thunkCreateNewreview(review))
  }
}

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

// delete review thunk
export const thunkRemoveReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(acDeleteReview(reviewId))
  }
}

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
      newState.user = {}
      console.log("REVIEWSREDUCER LOAD SPOT REVIEWS BEGIN:", newState)
      return newState

    case LOAD_USER_REVIEWS:
      console.log("REVIEWSREDUCER LOAD USER REVIEWS BEGIN:", state)
      newState = {...state}
      const normalizedUserReviews = {}
      //payload = reviews = [{}, {}]
      action.reviews.forEach((review) => normalizedUserReviews[review.id] = review)
      newState.user = normalizedUserReviews
      newState.spot = {}
      console.log("REVIEWSREDUCER LOAD USER REVIEWS BEGIN:", newState)
      return newState

    case CREATE_REVIEW:
      console.log("REVIEWSREDUCER CREATE REVIEW BEGIN:", state)
      newState = {...state}
      newState.user = {...state.user}
      newState.spot = {...state.spot, [action.review.id]: action.review}
      console.log("REVIEWSREDUCER CREATE REVIEW BEGIN:", newState)
      return newState

    case DELETE_REVIEW:
      console.log("REVIEWSREDUCER DELETE REVIEW BEGIN:", state)
      newState = {...state}
      newState.spot = {...state.spot}
      newState.user = {...state.user}
      delete newState.spot[action.reviewId]
      delete newState.user[action.reviewId]
      return newState

    default:
      return state
  }
}


export default reviewsReducer
