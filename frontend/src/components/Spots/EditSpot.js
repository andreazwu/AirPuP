import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewSpot } from "../../store/spots"
import SpotForm from "./SpotForm"
import "./EditSpot.css"
import { useParams } from "react-router-dom"

const EditSpot = () => {
  console.log("1 COMPONENT-EDITSPOT RUNNING")
  const { spotId } = useParams()

  const spot = useSelector((state) => {
    console.log("2 USE SELECTOR RUNNING")
    return state.spots[spotId]
  })

  console.log(`3 THIS IS THE SPOTID FROM PARAMS: ${spotId}; CURRENT SPOT RECEIVED FROM USE SELECTOR: ${spot}`)

  return (
    <>
      <div>Heyaa you're editing spot # {spotId}</div>
      <SpotForm spot={spot} formType="update" />
    </>
  )
}

export default EditSpot
