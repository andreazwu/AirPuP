import { csrfFetch } from './csrf';

// ACTION TYPES:
const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS"
const LOAD_ONE_SPOT = "spots/LOAD_ONE_SPOT"


// ACTION CREATORS:
const loadAllSpots = (spots) => {
  return {
    type: LOAD_ALL_SPOTS,
    spots
  }
}

const loadOneSpot = (spot) => {
  return {
    type: LOAD_ONE_SPOT,
    spot
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

// load all spots thunk
export const getOneSpot = (spotId) => async (dispatch, getState) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(loadOneSpot(spot))
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

    case LOAD_ONE_SPOT:
      console.log("SPOTSREDUCER LOADONESPOT BEGIN:", state)
      newState = {...state}
      newState.singleSpot = action.spot
      return newState



    default:
      return state
  }
}


export default spotsReducer

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
