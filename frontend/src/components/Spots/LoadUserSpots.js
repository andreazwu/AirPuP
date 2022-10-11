import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserSpots } from "../../store/spots";
import "./LoadUserSpots.css"


const LoadUserSpots = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.session.user)
  const spotsObj = useSelector((state)=>state.spots.allSpots)
  // {1:{x}, 2:{y}, 3:{z}}
  const spotsArr = Object.values(spotsObj) // [{x}, {y}, {z}]

  //dispatch THUNK AC
  useEffect(() => {
    dispatch(getUserSpots())
  }, [dispatch])

  //conditional rendering:
  //recall empty arr/ obj is NOT falsy
  if (!spotsArr.length) return null
  if (!currentUser) return <Redirect to="/" />

  return (
    <>
      <div className="whole-container">
        {/* {
          spotsArr.map((spot) => {
            <div key={spot.id} className="LoadUserSpots-wrapper">
              {console.log("4 (2.5) RETURN:", spot)}
              {spot}
            </div>
          })
        } */}
        <div className="spot-container">
          {
            spotsArr.map((spot) => (
              //implement spot in separate component; add prop
              <Spot key={spot.id} spot={spot}></Spot>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default LoadUserSpots
