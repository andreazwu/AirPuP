import { csrfFetch } from './csrf';

//---------------------------------------------------
// ACTION TYPES:
const LOAD_ALL_REVIEWS = "REVIEWS/LOAD_ALL_REVIEWS"
const LOAD_USER_REVIEWS = "REVIEWS/LOAD_USER_REVIEWS"
const LOAD_ONE_REVIEW = "REVIEWS/LOAD_ONE_REVIEW"
const CREATE_REVIEW = "REVIEWS/CREATE_REVIEW"
// const UPDATE_REVIEW = "REVIEWS/UPDATE_REVIEW"
const DELETE_REVIEW = "REVIEWS/DELETE_REVIEW"
const ADD_REVIEW_IMAGE = "REVIEWS/ADD_REVIEW_IMAGE"
const RESET_REVIEWS = "REVIEWS/RESET_REVIEWS"


//---------------------------------------------------
// ACTION CREATORS:
const acLoadAllreviews = (reviews) => {
  return {
    type: LOAD_ALL_REVIEWS,
    reviews
  }
}

const acLoadUserreviews = (reviews) => {
  return {
    type: LOAD_USER_REVIEWS,
    reviews
  }
}

const acLoadOnereview = (review) => {
  return {
    type: LOAD_ONE_REVIEW,
    review
  }
}

const acCreatereview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

// const acUpdatereview = (review) => {
  //   return {
    //     type: UPDATE_REVIEW,
    //     review
    //   }
    // }

    const acDeletereview = (reviewId) => {
      return {
        type: DELETE_REVIEW,
        reviewId
      }
    }

    const acAddreviewImage = (image) => {
      console.log("ACTION CREATOR ADD review IMAGE, PAYLOAD:", image)
      return {
        type: ADD_REVIEW_IMAGE,
        image
      }
    }

    // "reset" AC - to be used in useEffect clearnup fn
    export const acResetreviews = () => {
      return {
        type: RESET_REVIEWS
      }
    }

//---------------------------------------------------
// THUNK ACs:
// load all reviews thunk
export const thunkGetAllReviews = () => async (dispatch) => {
  console.log("THUNK STARTS RUNNING, BEFORE FETCH FROM BACKEND")
  const response = await csrfFetch("/api/reviews")
  console.log("THUNK STARTS RUNNING, AFTER FETCH FROM BACKEND")

  if (response.ok) {
    console.log("THUNK, BEFORE DISPATCH ACTION CREATOR")
    const reviews = await response.json() //array
    dispatch(acLoadAllreviews(reviews))
    console.log("THUNK, AFTER DISPATCH ACTION CREATOR -- CYCLE ENDS")
    // return reviews
  }
}

// load user reviews thunk
export const thunkGetUserreviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current")
  if (response.ok) {
    const reviews = await response.json() //array
    dispatch(acLoadUserreviews(reviews))
  }
}

// load one review thunk
export const thunkGetOnereview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`)
  if (response.ok) {
    const review = await response.json()
    dispatch(acLoadOnereview(review))
  }
}

// create new review thunk
export const thunkCreateNewreview = (newreview) => async (dispatch) => {
  console.log("THUNK CREATEreview STARTS RUNNING, BEFORE POST TO BACKEND")
  const response = await csrfFetch("/api/reviews", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newreview)
  })
  console.log("THUNK CREATEreview STARTS RUNNING, AFTER POST TO BACKEND")

  if (response.ok) {
    const newreview = await response.json()
    console.log("THUNK CREATEreview BEFORE DISPATCH AC")

    dispatch(acCreatereview(newreview))
    console.log("THUNK CREATEreview AFTER DISPATCH AC")

    return newreview //<<<<<< must return (for reviewform line 67) handlesubmit: newreview = await dispatch(thunkCreateNewreview(review))
  } else {
    //come back and do error handling logic <<<<<<<
    const data = await response.json()
    console.log(data)
  }
}

// update review thunk
export const thunkEditreview = (myreview, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(myreview)
  })

  if (response.ok) {
    const review = await response.json()
    dispatch(acUpdatereview(review))
    return review
  }
}

// delete review thunk
export const thunkRemovereview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(acDeletereview(reviewId))
  }
}

// add image thunk
export const thunkAddreviewImage = (reviewId, imageObj) => async (dispatch) => {
  console.log("THUNK ADDreviewIMAGE STARTS RUNNING, BEFORE POST TO BACKEND")
  const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify (
      imageObj
    )
  })
  console.log("THUNK ADDreviewIMAGE STARTS RUNNING, AFTER FETCH FROM BACKEND, RES:", response)

  if (response.ok) {
    console.log("THUNK ADDreviewIMAGE, BEFORE DISPATCH ACTION CREATOR (add review image)")
    const image = await response.json()
    dispatch(acAddreviewImage(image))
    console.log("THUNK ADDreviewIMAGE, AFTER DISPATCH ACTION CREATOR -- CYCLE ENDS")
    return image
  }
}


//---------------------------------------------------
// REDUCER:

const initialState = {
  allreviews:{},
  singlereview:{}
}

const reviewsReducer = (state = initialState, action) => {
  let newState
  switch (action.type){
    case LOAD_ALL_reviewS:
      console.log("reviewSREDUCER LOAD ALL reviewS BEGIN:", state)
      newState = {...state}
      const normalizedreviews = {}
      // action.reviews --> {reviews: [{x}, {y}, {z}]}
      action.reviews.reviews.forEach((review) => normalizedreviews[review.id] = review)
      newState.allreviews = normalizedreviews
      console.log("reviewSREDUCER LOAD ALL reviewS END:", newState)
      return newState

    case LOAD_USER_reviewS:
      console.log("reviewSREDUCER LOAD USER reviewS BEGIN:", state)
      newState = {...state}
      const normalizedUserreviews = {}
      // action.reviews --> {reviews: [{x}, {y}, {z}]}
      action.reviews.reviews.forEach((review) => normalizedUserreviews[review.id] = review)
      newState.allreviews = normalizedUserreviews
      console.log("reviewSREDUCER LOAD USER reviewS END:", newState)
      return newState

    case LOAD_ONE_review:
      console.log("reviewSREDUCER LOAD ONE review BEGIN:", state)
      newState = {...state}
      newState.singlereview = action.review
      console.log("reviewSREDUCER LOAD ONE review END:", newState)
      return newState

    case CREATE_review:
      console.log("reviewSREDUCER CREATE review BEGIN:", state)
      newState = {...state}
      //CREATE review returns response: missing "avgRating", "previewImage"
      newState.allreviews = {...state.allreviews, [action.review.id]: action.review}
      console.log("reviewSREDUCER CREATE review END:", newState)
      return newState

    case UPDATE_review:
      console.log("reviewSREDUCER UPDATE review BEGIN:", state)
      newState = {...state}
      // if (newState.allreviews[action.review.id])
      const updatedreview = {...newState.allreviews[action.review.id], ...action.review}
      console.log("reviewSREDUCER UPDATE review UPDATED review:", updatedreview)

      newState.singlereview = {...state.singlereview, ...acUpdatereview}
      newState.allreviews = {...state.allreviews, [action.review.id]: updatedreview}
      console.log("reviewSREDUCER UPDATE review END:", newState)
      return newState

    case DELETE_review:
      console.log("reviewSREDUCER DELETE review BEGIN:", state)
      newState = {...state}
      newState.allreviews = {...state.allreviews}
      newState.singlereview = {...state.singlereview}
      delete newState.allreviews[action.reviewId]
      if (newState.singlereview.id === action.reviewId) newState.singlereview = {}
      console.log("reviewSREDUCER DELETE review END:", newState)
      return newState

    case ADD_review_IMAGE:
      console.log("reviewSREDUCER ADD review IMAGE BEGIN:", state)

      newState = {...state}
      newState.allreviews = {...state.allreviews}
      newState.singlereview = {...state.singlereview}
      // newState.singlereview.reviewImages = [...state.singlereview.reviewImages, action.image] // ?? err: not iterable
      newState.singlereview.reviewImages = [action.image]

      console.log("reviewSREDUCER ADD review IMAGE END:", newState)
      return newState

    case RESET_reviewS:
      newState = {...state}
      newState.allreviews = {}
      return newState

    default:
      return state
  }
}


export default reviewsReducer
