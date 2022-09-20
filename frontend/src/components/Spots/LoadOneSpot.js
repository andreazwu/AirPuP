import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import "./LoadOneSpot.css"

const LoadOneSpot = () => {
  console.log("1 COMPONENT-LOADONESPOT RUNNING")
  const dispatch = useDispatch()
  // const params = useParams()
  // const [spotId, setSpotId] = useState(+params.spotId)
  const { spotId } = useParams()

  const spot = useSelector((state)=>{
    console.log("2 USE SELECTOR RUNNING")
    return state.spots.singleSpot
  }) // single obj {x}

  //dispatch THUNK AC
  useEffect(() => {
    console.log("5 USE EFFECT RUNNING")
    dispatch(getOneSpot(+spotId)) //<<<< spotId =__=|||
  }, [dispatch, spotId])

  console.log(`3 THIS IS THE SPOTID FROM PARAMS: ${spotId}; CURRENT SPOT RECEIVED FROM USE SELECTOR: ${spot}`)

  //conditional rendering:
  // if (!spot) return null
  if (!Object.values(spot).length) return null

  return (
    <>
      <div className="whole-container">
        <div className="spot-container">
        Heyaa this is spot # {spotId}


          <div>
            <h2>{spot.name}</h2>
          </div>

          <div className="title-detail">
            {spot.avgRating ?
              (<span>★{spot.avgRating}  ·  </span>):
              (<span>no rating  ·  </span>)
            }

            {/* {console.log("RETURN NUM REVIEWS:", spot.numReviews)} */}
            {/* {console.log("add review link here <<<<<")} */}
            <span>{spot.numReviews} reviews  ·  </span>

            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>

        </div>
      </div>
    </>
  )
}

export default LoadOneSpot

/*
singleSpot: {
  id,ownerId,address,city,state,country,lat,lng,
  name,description,price,
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
