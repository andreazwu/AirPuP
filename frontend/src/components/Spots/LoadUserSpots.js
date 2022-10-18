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
      console.log("LOADUSERSPOT USE EFFECT CLEANUP FUNCTION: RESET SPOTS")
      dispatch(acResetSpots())
    }
  }, [dispatch])

  //conditional rendering:
  //recall empty arr/ obj is NOT falsy
  // if (!spotsArr.length) return null
  if (!currentUser) return <Redirect to="/" />

  return (
    <>
      <div>
        <h1>My Spots</h1>
      </div>

      <div className="wrapper-center">
        <div className="allspots-container">
          {
            spotsArr.length === 0 ?

            <div>You're not currently hosting any spots!</div> :

            spotsArr.map((spot) => (
              //implement spot in separate component add prop
              <MySpot key={spot.id} spot={spot}>
                {console.log("LOAD USER SPOTS COMPONENT RETURN:", spot)}
              </MySpot>
            ))
          }
        </div>
      </div>

    </>
  )
}

export default LoadUserSpots
