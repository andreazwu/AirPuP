import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import "./LoadOneSpot.css"

const LoadOneSpot = () => {

  const dispatch = useDispatch()
  // const params = useParams()
  // const spotIdFromParams = Number(params.spotId)
  // const [spotId, setSpotId] = useState(spotIdFromParams)
  const { spotId } = useParams()

  const spot = useSelector((state)=>{
    return state.spots.singleSpot
  }) // {x}

  //dispatch THUNK AC
  useEffect(() => {
    console.log("USE EFFECT RUNNING")
    dispatch(getOneSpot())
  }, [dispatch])

  console.log("THIS IS THE CURRENT SPOT RECEIVED FROM USE SELECTOR:", spot)

  //conditional rendering:
  if (!spot) return null

  return (
    <>
      <div className="whole-container">
        <div className="spot-container">

        </div>
      </div>
    </>
  )
}

export default LoadOneSpot

/*
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
*/
