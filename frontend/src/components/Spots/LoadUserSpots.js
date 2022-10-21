import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { thunkGetUserSpots, acResetSpots } from "../../store/spots"
import MySpot from "./MySpot"
import "./Spots.css"


const LoadUserSpots = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.session.user)
  const spotsObj = useSelector((state)=>state.spots.allSpots) // {1:{x}, 2:{y}, 3:{z}}
  const spotsArr = Object.values(spotsObj) // [{x}, {y}, {z}]

  useEffect(() => {
    dispatch(thunkGetUserSpots())
    // cleanup function to reset spots
    return () => {
      // console.log("LOADUSERSPOT USE EFFECT CLEANUP FUNCTION: RESET SPOTS")
      dispatch(acResetSpots())
    }
  }, [dispatch])

  //conditional rendering:
  //recall empty arr/ obj is NOT falsy
  // if (!spotsArr.length) return null
  if (!currentUser) return <Redirect to="/" />

  return (
    <>
      <div className="myspots-header">
        {
          spotsArr.length === 0 ?
          (<>
            <h1>My Spots</h1>
            <h4>You Don't Have Any Spots!</h4>
          </>):
          <h1>My Spots</h1>
        }
      </div>

      <div className="wrapper-center">
        <div className="allspots-container myspots">
          {
            spotsArr.map((spot) => (
              //implement spot in separate component add prop
              <MySpot key={spot.id} spot={spot}>
                {/* {console.log("LOAD USER SPOTS COMPONENT RETURN:", spot)} */}
              </MySpot>
            ))
          }
        </div>
      </div>

    </>
  )
}

export default LoadUserSpots
