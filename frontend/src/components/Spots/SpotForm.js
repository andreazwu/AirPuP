import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewSpot } from "../../store/spots"
import "./SpotForm.css"

const SpotForm = ({spot, formType}) => {
  console.log("1 COMPONENT-SPOTFORM RUNNING")

  const dispatch = useDispatch()

  const user = useSelector((state) => {
    console.log("2 USE SELECTOR RUNNING")
    return state.session.user
  })

  console.log(`3 THIS IS THE USER FROM USE SELECTOR: ${user}`)

  const [address, setAddress] = useState(spot.address || "")
  const [city, setCity] = useState(spot.city || "")
  const [state, setState] = useState(spot.state || "")
  const [country, setCountry] = useState(spot.country || "")
  const [lat, setLat] = useState(spot.lat || "")
  const [lng, setLng] = useState(spot.lng || "")
  const [name, setName] = useState(spot.name || "")
  const [description, setDescription] = useState(spot.description || "")
  const [price, setPrice] = useState(spot.price || "")

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // //check if user is logged in
  // useEffect(() => {
  //   if (user) setErrors([])
  //   else setErrors(["Must log in to create a spot"])
  // }, [user]);
  // //instead of useEffect, maybe try implement in onSubmit??

  //check for validation errors
  useEffect(() => {
    let errorsArr = []

    if (!address.length) errorsArr.push("please enter street address")
    if (!city.length) errorsArr.push("please enter city")
    if (!state.length) errorsArr.push("please enter state")
    if (!country.length) errorsArr.push("please enter country")
    if (!lat.length || lat > 90 || lat < -90) errorsArr.push("please enter a valid latitude between -90 and 90")
    if (!lng.length || lng > 180 || lng < -180) errorsArr.push("please enter a valid longitude between -180 and 180")
    if (!name.length || name.length > 50) errorsArr.push("please enter a valid name less than 50 characters")
    if (!description.length) errorsArr.push("please enter a description")
    if (!price.length || price <=0 || !price.isInteger()) errorsArr.push("please enter a valid price per day - an integer greater than 0")

    setErrors(errorsArr)
  }, [address, city, state, country, lat, lng, name, description, price])



    const handleSubmit = async (e) => {
      e.preventDefault()

      const newSpot = {
        address, city, state, country, lat, lng, name, description, price
      }
      console.log("SPOTFORM - HANDLESUBMIT, NEWSPOT:", newSpot)

      const result = await dispatch(createNewSpot(newSpot))
      console.log("SPOTFORM - HANDLESUBMIT, RESULT AFTER DISPATCH:", result)

    }







  return (
    <>
      <form onSubmit={handleSubmit}>

        <h2>Become a host today!</h2>

        <div className="create-spot-container">
          <div>
            {errors.map((error)=>(<div>{error}</div>))}
          </div>




        </div>

      </form>
    </>
  )
}

export default SpotForm
