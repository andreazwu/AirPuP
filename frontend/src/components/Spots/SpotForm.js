import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNewSpot, thunkEditSpot } from "../../store/spots"
import "./Spots.css"

const SpotForm = ({spot, formType}) => {
  console.log("1 COMPONENT-SPOTFORM RUNNING")

  const dispatch = useDispatch()
  const history = useHistory()

  const currentUser = useSelector((state) => {
    console.log("2 USE SELECTOR RUNNING")
    return state.session.user
  })

  console.log(`3 THIS IS THE USER FROM USE SELECTOR: ${currentUser}`)

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
    if (!price || price <=0) errorsArr.push("please enter a valid price per day - value must be greater than 0")

    setErrors(errorsArr)
  }, [address, city, state, country, lat, lng, name, description, price])



  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    if (!currentUser) alert ("You must log in/ sign up to become a host!")
    if (errors.length) alert ("Please provide a valid entry!")

    const spot = {
      // ...spot, //ReferenceError: Cannot access 'spot' before initialization
      address, city, state, country, lat, lng, name, description, price
    }

    console.log("SPOTFORM HANDLESUBMIT, CURRENT SPOT:", spot)

    if (formType==="create") {
      const newSpot = await dispatch(thunkCreateNewSpot(spot)) // MUST await
      console.log(newSpot) //<<< newSpot undefined at time of console-logging

      //redirect to newly created spot -- cannot read id <<<<<<
      if (newSpot) history.push(`/spots/${newSpot.id}`) // not working
    }

    else if (formType==="update") {
      const modifiedSpot = await dispatch(thunkEditSpot(spot))
      console.log("SPOTFORM HANDLESUBMIT - UPDATE, RESULT AFTER DISPATCH:", modifiedSpot)
      if (modifiedSpot) history.push(`/spots/${modifiedSpot.id}`) // not working
    }

    if (spot) reset()
    history.push("/myspots")
  }

  const reset = () => {
    setAddress("")
    setCity("")
    setState("")
    setCountry("")
    setLat("")
    setLng("")
    setName("")
    setDescription("")
    setPrice("")
    setErrors([])
    setHasSubmitted(false)
  }


  return (
    <>
      <div>
        {hasSubmitted && errors.map((error)=>(<div key={error}>{error}</div>))}
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Please Enter Your Spot Info: </h2>

        <div className="create-spot-container">


            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            <label>
              Latitude:
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>
            <label>
              Longitude:
              <input
                type="number"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
        </div>

        <button type="submit">Submit</button>

      </form>
    </>
  )
}

export default SpotForm
