import { csrfFetch } from './csrf';

// ACTION TYPES:
const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS"


// ACTION CREATORS:
const loadSpots = (spots) => {
  return {
    action: LOAD_ALL_SPOTS,
    spots
  }
}


// THUNK ACs:
// load all spots thunk
export const getAllSpots = () => async (dispatch, getState) => {
  const response = await csrfFetch("/api/spots")
  if (response.ok) {
    const spots = await response.json() //array
    dispatch(loadSpots(spots))
    // return spots
  }
}

const initialState = {}

// REDUCER:
const spotReducer = (state = initialState, action) => {
  let newState
  switch (action.type){
    case LOAD_ALL_SPOTS:
      newState = {...state}
      action.spots.forEach((spot) => newState[spot.id] = spot) //normalization
      return newState
  }
}


export default spotReducer
