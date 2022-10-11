import { csrfFetch } from './csrf';

// ACTION TYPES:
const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS"
const LOAD_USER_SPOTS = "spots/LOAD_USER_SPOTS"
const LOAD_ONE_SPOT = "spots/LOAD_ONE_SPOT"
const CREATE_SPOT = "spots/CREATE_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"


// ACTION CREATORS:
const loadAllSpots = (spots) => {
  return {
    type: LOAD_ALL_SPOTS,
    spots
  }
}

const loadUserSpots = (spots) => {
  return {
    type: LOAD_USER_SPOTS,
    spots
  }
}

const loadOneSpot = (spot) => {
  return {
    type: LOAD_ONE_SPOT,
    spot
  }
}

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  }
}

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  }
}

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}


// THUNK ACs:
// load all spots thunk
export const getAllSpots = () => async (dispatch, getState) => {
  const response = await csrfFetch("/api/spots")
  if (response.ok) {
    const spots = await response.json() //array
    dispatch(loadAllSpots(spots))
    // return spots
  }
}

//load user spots thunk
export const getUserSpots = () => async (dispatch, getState) => {
  const response = await csrfFetch("/api/spots/current")
  if (response.ok) {
    const spots = await response.json() //array
    dispatch(loadAllSpots(spots))
  }
}

// load one spot thunk
export const getOneSpot = (spotId) => async (dispatch, getState) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(loadOneSpot(spot))
  }
}

// create new spot thunk
export const createNewSpot = (newspot) => async (dispatch, getState) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newspot)
  })

  if (response.ok) {
    const newspot = await response.json()
    dispatch(createSpot(newspot))
    return newspot //<<<<<< must return (for spotform line 67)
  } else {
    //come back and do error handling logic <<<<<<<
    const data = await response.json()
    console.log(data)
  }
}

// update spot thunk
export const editSpot = (myspot) => async (dispatch, getState) => {
  const response = await csrfFetch(`/api/spots/${myspot.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(myspot)
  })

  if (response.ok) {
    const spot = await response.json()
    dispatch(updateSpot(spot))
    return spot
  } else {
    //come back and do error handling logic <<<<<<<
  }
}

// delete spot thunk
export const removeSpot = (spotId) => async (dispatch, getState) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteSpot(spotId))
  }
}


// REDUCER:

const initialState = {
  allSpots:{},
  singleSpot:{}
}

// const initialState = {}

const spotsReducer = (state = initialState, action) => {
  let newState
  switch (action.type){
    case LOAD_ALL_SPOTS:
      console.log("SPOTSREDUCER LOADALLSPOTS BEGIN:", state)
      newState = {...state}
      const normalizedSpots = {}
      // action.spots --> {Spots: [{x}, {y}, {z}]}
      action.spots.Spots.forEach((spot) => normalizedSpots[spot.id] = spot)
      newState.allSpots = normalizedSpots
      console.log("SPOTSREDUCER LOADALLSPOTS END:", newState)
      return newState

    case LOAD_USER_SPOTS:
      console.log("SPOTSREDUCER LOADUSERSPOTS BEGIN:", state)
      newState = {...state}
      const normalizedUserSpots = {}
      // action.spots --> {Spots: [{x}, {y}, {z}]}
      action.spots.Spots.forEach((spot) => normalizedUserSpots[spot.id] = spot)
      newState.allSpots = normalizedUserSpots
      console.log("SPOTSREDUCER LOADALLSPOTS END:", newState)
      return newState

    case LOAD_ONE_SPOT:
      console.log("SPOTSREDUCER LOADONESPOT BEGIN:", state)
      newState = {...state}
      newState.singleSpot = action.spot
      console.log("SPOTSREDUCER LOADONESPOT END:", newState)
      return newState

    case CREATE_SPOT:
      console.log("SPOTSREDUCER CREATESPOT BEGIN:", state)
      newState = {...state}
      //CREATE SPOT returns response: missing "avgRating", "previewImage"
      newState.allSpots = {...state.allSpots, [action.spot.id]: action.spot}
      console.log("SPOTSREDUCER CREATESPOT END:", newState)
      return newState

    case UPDATE_SPOT:
      console.log("SPOTSREDUCER UPDATESPOT BEGIN:", state)
      newState = {...state}
      // if (newState.allSpots[action.spot.id])
      const updatedSpot = {...newState.allSpots[action.spot.id], ...action.spot}
      console.log("SPOTSREDUCER UPDATESPOT UPDATED SPOT:", updatedSpot)

      newState.singleSpot = {...state.singleSpot, ...updateSpot}
      newState.allSpots = {...state.allSpots, [action.spot.id]: updatedSpot}
      console.log("SPOTSREDUCER UPDATESPOT END:", newState)
      return newState

    case DELETE_SPOT:
      console.log("SPOTSREDUCER DELETESPOT BEGIN:", state)
      newState = {...state}
      newState.allSpots = {...state.allSpots}
      newState.singleSpot = {...state.singleSpot}
      delete newState.allSpots[action.spotId]
      if (newState.singleSpot.id === action.spotId) newState.singleSpot = {}
      console.log("SPOTSREDUCER DELETESPOT END:", newState)
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
