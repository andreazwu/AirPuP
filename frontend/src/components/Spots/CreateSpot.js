import React, { useEffect } from "react"
import SpotForm from "./SpotForm"
import "./CreateSpot.css"

const CreateSpot = () => {
  const spot = {}
  console.log("COMPONENT CREATESPOT'S SPOT:", spot)

  return (
    <SpotForm spot={spot} formType="create" />
  )
}

export default CreateSpot
