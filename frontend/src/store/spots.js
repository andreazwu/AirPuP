import { csrfFetch } from './csrf';

//---------------------------------------------------
// ACTION TYPES:
const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS"
const LOAD_USER_SPOTS = "spots/LOAD_USER_SPOTS"
const LOAD_ONE_SPOT = "spots/LOAD_ONE_SPOT"
const CREATE_SPOT = "spots/CREATE_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"
const ADD_SPOT_IMAGE = "spots/ADD_SPOT_IMAGE"
const RESET_SPOTS = "spots/RESET_SPOTS"

//---------------------------------------------------
// ACTION CREATORS:
const acLoadAllSpots = (spots) => {
  return {
    type: LOAD_ALL_SPOTS,
    spots
  }
}

const acLoadUserSpots = (spots) => {
  return {
    type: LOAD_USER_SPOTS,
    spots
  }
}

const acLoadOneSpot = (spot) => {
  return {
    type: LOAD_ONE_SPOT,
    spot
  }
}

const acCreateSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  }
}

const acUpdateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  }
}

const acDeleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}

const acAddSpotImage = (image) => {
  console.log("ACTION CREATOR ADD SPOT IMAGE, PAYLOAD:", image)
  return {
    type: ADD_SPOT_IMAGE,
    image
  }
}

// "reset" AC - to be used in useEffect clearnup fn
export const acResetSpots = () => {
  return {
    type: RESET_SPOTS
  }
}


// THUNK ACs:
// load all spots thunk
export const thunkGetAllSpots = () => async (dispatch) => {
  console.log("THUNK STARTS RUNNING, BEFORE FETCH FROM BACKEND")
  const response = await csrfFetch("/api/spots")
  console.log("THUNK STARTS RUNNING, AFTER FETCH FROM BACKEND")

  if (response.ok) {
    console.log("THUNK, BEFORE DISPATCH ACTION CREATOR")
    const spots = await response.json() //array
    dispatch(acLoadAllSpots(spots))
    console.log("THUNK, AFTER DISPATCH ACTION CREATOR -- CYCLE ENDS")
    // return spots
  }
}

// load user spots thunk
export const thunkGetUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current")
  if (response.ok) {
    const spots = await response.json() //array
    dispatch(acLoadUserSpots(spots))
  }
}

// load one spot thunk
export const thunkGetOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(acLoadOneSpot(spot))
  }
}

// create new spot thunk
export const thunkCreateNewSpot = (newspot) => async (dispatch) => {
  console.log("THUNK CREATESPOT STARTS RUNNING, BEFORE POST TO BACKEND")
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newspot)
  })
  console.log("THUNK CREATESPOT STARTS RUNNING, AFTER POST TO BACKEND")

  if (response.ok) {
    const newspot = await response.json()
    console.log("THUNK CREATESPOT BEFORE DISPATCH AC")

    dispatch(acCreateSpot(newspot))
    console.log("THUNK CREATESPOT AFTER DISPATCH AC")

    return newspot //<<<<<< must return (for spotform line 67) handlesubmit: newSpot = await dispatch(thunkCreateNewSpot(spot))
  } else {
    //come back and do error handling logic <<<<<<<
    const data = await response.json()
    console.log(data)
  }
}

// update spot thunk
export const thunkEditSpot = (myspot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(myspot)
  })

  if (response.ok) {
    const spot = await response.json()
    dispatch(acUpdateSpot(spot))
    return spot
  }
}

// delete spot thunk
export const thunkRemoveSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(acDeleteSpot(spotId))
  }
}

// add image thunk
export const thunkAddSpotImage = (spotId, imageObj) => async (dispatch) => {
  console.log("THUNK ADDSPOTIMAGE STARTS RUNNING, BEFORE POST TO BACKEND")
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify (
      imageObj
    )
  })
  console.log("THUNK ADDSPOTIMAGE STARTS RUNNING, AFTER FETCH FROM BACKEND, RES:", response)

  if (response.ok) {
    console.log("THUNK ADDSPOTIMAGE, BEFORE DISPATCH ACTION CREATOR (add spot image)")
    const image = await response.json()
    dispatch(acAddSpotImage(image))
    console.log("THUNK ADDSPOTIMAGE, AFTER DISPATCH ACTION CREATOR -- CYCLE ENDS")
    return image
  }
}

//---------------------------------------------------
// REDUCER:

const initialState = {
  allSpots:{},
  singleSpot:{}
}

const spotsReducer = (state = initialState, action) => {
  let newState
  switch (action.type){
    case LOAD_ALL_SPOTS:
      console.log("SPOTSREDUCER LOAD ALL SPOTS BEGIN:", state)
      newState = {...state}
      const normalizedSpots = {}
      // action.spots --> {Spots: [{x}, {y}, {z}]}
      action.spots.Spots.forEach((spot) => normalizedSpots[spot.id] = spot)
      newState.allSpots = normalizedSpots
      console.log("SPOTSREDUCER LOAD ALL SPOTS END:", newState)
      return newState

    case LOAD_USER_SPOTS:
      console.log("SPOTSREDUCER LOAD USER SPOTS BEGIN:", state)
      newState = {...state}
      const normalizedUserSpots = {}
      // action.spots --> {Spots: [{x}, {y}, {z}]}
      action.spots.Spots.forEach((spot) => normalizedUserSpots[spot.id] = spot)
      newState.allSpots = normalizedUserSpots
      console.log("SPOTSREDUCER LOAD USER SPOTS END:", newState)
      return newState

    case LOAD_ONE_SPOT:
      console.log("SPOTSREDUCER LOAD ONE SPOT BEGIN:", state)
      newState = {...state}
      newState.singleSpot = action.spot
      console.log("SPOTSREDUCER LOAD ONE SPOT END:", newState)
      return newState

    case CREATE_SPOT:
      console.log("SPOTSREDUCER CREATE SPOT BEGIN:", state)
      newState = {...state}
      //CREATE SPOT returns response: missing "avgRating", "previewImage"
      newState.allSpots = {...state.allSpots, [action.spot.id]: action.spot}
      console.log("SPOTSREDUCER CREATE SPOT END:", newState)
      return newState

    case UPDATE_SPOT:
      console.log("SPOTSREDUCER UPDATE SPOT BEGIN:", state)
      newState = {...state}
      // if (newState.allSpots[action.spot.id])
      const updatedSpot = {...newState.allSpots[action.spot.id], ...action.spot}
      console.log("SPOTSREDUCER UPDATE SPOT UPDATED SPOT:", updatedSpot)

      newState.singleSpot = {...state.singleSpot, ...acUpdateSpot}
      newState.allSpots = {...state.allSpots, [action.spot.id]: updatedSpot}
      console.log("SPOTSREDUCER UPDATE SPOT END:", newState)
      return newState

    case DELETE_SPOT:
      console.log("SPOTSREDUCER DELETE SPOT BEGIN:", state)
      newState = {...state}
      newState.allSpots = {...state.allSpots}
      newState.singleSpot = {...state.singleSpot}
      delete newState.allSpots[action.spotId]
      if (newState.singleSpot.id === action.spotId) newState.singleSpot = {}
      console.log("SPOTSREDUCER DELETE SPOT END:", newState)
      return newState

    case ADD_SPOT_IMAGE:
      console.log("SPOTSREDUCER ADD SPOT IMAGE BEGIN:", state)

      newState = {...state}
      newState.allSpots = {...state.allSpots}
      newState.singleSpot = {...state.singleSpot}
      // newState.singleSpot.SpotImages = [...state.singleSpot.SpotImages, action.image] // ?? err: not iterable
      newState.singleSpot.SpotImages = [action.image]

      console.log("SPOTSREDUCER ADD SPOT IMAGE END:", newState)
      return newState

    case RESET_SPOTS:
      newState = {...state}
      newState.allSpots = {}
      return newState

    default:
      return state
  }
}


export default spotsReducer

/* CREATE SPOT returns response: missing "avgRating", "previewImage":
{
  "id": 1,
  "ownerId": 1,
  "address": "123 Disney Lane",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 37.7645358,
  "lng": -122.4730327,
  "name": "App Academy",
  "description": "Place where web developers are created",
  "price": 123,
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-19 20:39:36"
}
 */

/*spots: {

    allSpots: {
      [spotId]: {
         id,
         ownerId,
         address,
         city,
         state,
         country
         lat,
         lng,
         name,
         description,
         price,
         avgRating,
         previewImage
      },
      optionalOrderedList: []
    },

    singleSpot: {
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      numReviews,
      avgRating,
      SpotImages: [
         {
            id,
            url,
            preview
         }
      ],
      Owner: {
         id,
         firstName,
         lastName
      }
    }
  }
 */
