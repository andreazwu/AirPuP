import React, { useEffect } from "react"
import SpotForm from "./SpotForm"
import "./EditSpot.css"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getOneSpot } from "../../store/spots"


const EditSpot = () => {
  console.log("1 COMPONENT-EDITSPOT RUNNING")
  const { spotId } = useParams()
  const dispatch = useDispatch()

  const spot = useSelector((state) => {
    console.log("2 USE SELECTOR RUNNING")
    return state.spots.singleSpot
  })

  //dispatch THUNK AC
  useEffect(() => {
    console.log("5 USE EFFECT RUNNING")
    dispatch(getOneSpot(+spotId)) //<<<< spotId =__=|||
  }, [dispatch, spotId])

  console.log(`3 THIS IS THE SPOTID FROM PARAMS: ${spotId}; CURRENT SPOT RECEIVED FROM USE SELECTOR: ${spot}`)

  return (
    <>
      <div>Heyaa you're editing spot #{spotId}: {spot.name}</div>
      <SpotForm spot={spot} formType="update" />
    </>
  )
}

export default EditSpot
