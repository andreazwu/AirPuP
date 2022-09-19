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
  allSpots:{spotId:{}},
  // singleSpot:{}
}

const spotsReducer = (state = initialState, action) => {
  let newState
  switch (action.type){
    case LOAD_ALL_SPOTS:
      newState = {...state, allSpots:{...action.spots}}
      // action.spots.forEach((spot) => newState[spot.id] = spot) //normalization
      return newState

    default:
      return state
  }
}


export default spotsReducer
