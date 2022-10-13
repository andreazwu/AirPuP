import React, { useEffect } from "react"
import SpotForm from "./SpotForm"
import "./Spots.css"
// import { thunkGetOneSpot } from "../../store/spots"

const CreateSpot = () => {
  const spot = {}
  console.log("COMPONENT CREATESPOT'S SPOT:", spot)

  return (
    <SpotForm spot={spot} formType="create" />
  )
}

export default CreateSpot
