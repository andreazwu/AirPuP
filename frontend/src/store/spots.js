import { csrfFetch } from './csrf';

// ACTION TYPES:
const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS"


// ACTION CREATORS:
const loadAllSpots = (spots) => {
  return {
    type: LOAD_ALL_SPOTS,
    spots
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
