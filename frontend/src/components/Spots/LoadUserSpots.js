import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserSpots } from "../../store/spots";
//import MySpot
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
        <h1>My Spots</h1>
      </div>

      <div className="spot-container">
          {
            spotsArr.length === 0 ?

            <div>You're not currently hosting any spots.</div> :

            spotsArr.map((spot) => (
              //implement spot in separate component; add prop
              <MySpot key={spot.id} spot={spot}></MySpot>
            ))
          }
      </div>

    </>
  )
}

export default LoadUserSpots
