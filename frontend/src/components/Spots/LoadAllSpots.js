import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./Spots.css"


const LoadAllSpots = () => {
  console.log("1 (2.2) COMPONENT-LOADALLSPOTS RUNNING")
  const dispatch = useDispatch()

  const spotsObj = useSelector((state)=>{
    console.log("2 (2.1/3) USE SELECTOR RUNNING")
    return state?.spots.allSpots
  }) // {Spots: [{x}, {y}, {z}]}

  const spots = Object.values(spotsObj) // [{x}, {y}, {z}]

  //dispatch THUNK AC
  useEffect(() => {
    console.log("5 USE EFFECT RUNNING")
    dispatch(getAllSpots())
  }, [dispatch])

  console.log("3 (2.4) THIS IS THE CURRENT SPOTS RECEIVED FROM USE SELECTOR:", spotsObj, "----------", spots)

  //conditional rendering:
  if (!spots) return null

  return (
    <>
      <div>
        {
          spots.map((spot) => {
            <div key={spot.id} className="loadAllSpots-wrapper">
              {console.log("4 (2.5) RETURN:", spot)}
              {spot}
            </div>
          })
        }
      </div>
    </>
  )
}

export default LoadAllSpots
