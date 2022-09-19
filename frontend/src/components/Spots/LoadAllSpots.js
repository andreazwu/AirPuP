import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./Spots.css"


const LoadAllSpots = () => {
  console.log("COMPONENT-LOADALLSPOTS RUNNING")
  const dispatch = useDispatch()

  const spotsObj = useSelector((state)=>{
    console.log("LOADALLSPOTS USE SELECTOR RUNNING")
    return state?.spots.allSpots
  })
  const spots = Object.values(spotsObj)

  //dispatch THUNK AC
  useEffect(() => {
    console.log("LOADALLSPOTS USE EFFECT RUNNING")
    dispatch(getAllSpots())
  }, [dispatch])

  console.log("THIS IS THE CURRENT SPOTSOBJ RECEIVED FROM USE SELECTOR:", spotsObj)
  console.log("THIS IS THE CURRENT SPOTS (object.values(spotsobj)) RECEIVED FROM USE SELECTOR:", spots)

  //conditional rendering:
  if (!spots) return null

  return (
    <>
      <div>
        {
          spots.map((spot) => {
            <div key={spot.id} className="loadAllSpots-wrapper">
              {console.log("RETURN COMPONENT LISTALLSPOTS:", spots)}
              {spots}
            </div>
          })
        }
      </div>
    </>
  )
}

export default LoadAllSpots
