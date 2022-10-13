import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../store/spots";
import Spot from "./Spot"
import "./Spots.css"


const LoadAllSpots = () => {
  console.log("1 (2.2) COMPONENT-LOADALLSPOTS STARTS")
  const dispatch = useDispatch()

  const spotsObj = useSelector((state)=>{
    console.log("2 (2.1/3) USE SELECTOR RUNNING: DETECTS CHANGES IN STATE")
    return state.spots.allSpots
  }) // {1:{x}, 2:{y}, 3:{z}}

  const spotsArr = Object.values(spotsObj) // [{x}, {y}, {z}]

  //dispatch THUNK AC
  useEffect(() => {
    console.log("5 USE EFFECT RUNNING: DISPATCH THUNK")
    dispatch(thunkGetAllSpots())
  }, [dispatch])

  console.log("3 (2.4) THIS IS THE CURRENT SPOTS RECEIVED FROM USE SELECTOR:", spotsObj, "ARRAY:", spotsArr)

  //conditional rendering:
  //recall empty arr/ obj is NOT falsy
  if (!spotsArr.length) return null

  return (
    <>
      <div className="allspots-wrapper">
        <div className="allspots-container">
          {
            spotsArr.map((spot) => (
              //implement spot in separate component; add prop
              <Spot key={spot.id} spot={spot}>
                {console.log("4 (2.5) RETURN:", spot)}
              </Spot>
            ))
          }
        </div>
      </div>

  {console.log("END OF LOADALLSPOTS COMPONENT")}

    </>
  )
}

export default LoadAllSpots
