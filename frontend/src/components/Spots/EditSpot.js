import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkEditSpot, thunkGetOneSpot, thunkAddSpotImage } from "../../store/spots"

import "./Spots.css"

const EditSpot = () => {
  console.log("EditSpot COMPONENT STARTS:")

  const { spotId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const spot = useSelector((state) => state.spots.singleSpot)
  const currentUser = useSelector((state) => state.session.user)

  const [address, setAddress] = useState(spot && spot.address)
  const [city, setCity] = useState(spot && spot.city)
  const [state, setState] = useState(spot && spot.state)
  const [country, setCountry] = useState(spot && spot.country)
  // const [lat, setLat] = useState(spot && spot.lat)
  // const [lng, setLng] = useState(spot && spot.lng)
  const [name, setName] = useState(spot && spot.name)
  const [description, setDescription] = useState(spot && spot.description)
  const [price, setPrice] = useState(spot && spot.price)

  // const [url, setUrl] = useState(spot.SpotImages[0].url)
  // const [url, setUrl] = useState("")

  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    console.log("USE EFFECT FOR FETCHING ONE SPOT STARTS, SPOTID:", spotId)
    dispatch(thunkGetOneSpot(+spotId))
  }, [dispatch, spotId])

  //check for validation errors
  useEffect(() => {
    console.log("USE EFFECT FOR VALIDATION ERRORS STARTS")
    let errorsArr = []

    if (!address.length) errorsArr.push("please enter street address")
    if (!city.length) errorsArr.push("please enter city")
    if (!state.length) errorsArr.push("please enter state")
    if (!country.length) errorsArr.push("please enter country")
    // if (!lat.length || lat > 90 || lat < -90) errorsArr.push("please enter a valid latitude between -90 and 90")
    // if (!lng.length || lng > 180 || lng < -180) errorsArr.push("please enter a valid longitude between -180 and 180")
    if (!name.length || name.length > 50) errorsArr.push("please enter a valid name fewer than 50 characters long")
    if (!description.length) errorsArr.push("please enter a description")
    if (!price || price <=0) errorsArr.push("please enter a valid price greater than 0")
    // if (!url.length || url.length > 255) errorsArr.push("please enter a valid image url fewer than 255 characters long")

    console.log("USE EFFECT FOR VALIDATION ERRORS ENDS, ERRORS ARR:", errorsArr)

    setErrors(errorsArr)
  }, [address, city, state, country, name, description, price])


  // handleSubmit is ASYNCHRONOUS
  const handleSubmit = async (e) => {
    console.log("EDITSPOT COMPONENT HANDLESUBMIT STARTS:")
    e.preventDefault()
    setHasSubmitted(true)

    const spot = {
      address, city, state, country, name, description, price
    }

    console.log("COMPONENT HANDLESUBMIT, BEFORE DISPATCH THUNK, PAYLOAD SPOT:", spot)

    // AWAIT thunk; returns promise (spotObj or errors)
    const updatedSpot = await dispatch(thunkEditSpot(spot))

    if (updatedSpot) {
      console.log("COMPONENT HANDLESUBMIT, AFTER THUNK AC RETURNS PROMISE, updatedSpot:", updatedSpot)

      // const imageObj = ({ url: url, preview: true})

      // console.log("COMPONENT HANDLESUBMIT, BEFORE DISPATCH THUNK FOR ADD SPOT IMAGE, IMAGEOBJ:", imageObj)

      // await dispatch(thunkAddSpotImage(updatedSpot.id, imageObj))

      // history.push(`/spots/${updatedSpot.id}`) // ?? type err: cannot read properties of undefined in LoadOneSpot

      reset()
      history.push("/myspots")
    }
    console.log("COMPONENT HANDLESUBMIT ENDS")
  }

  const reset = () => {
    setAddress("")
    setCity("")
    setState("")
    setCountry("")
    // setLat("")
    // setLng("")
    setName("")
    setDescription("")
    setPrice("")
    // setUrl("")
    setErrors([])
    setHasSubmitted(false)
  }

  const cancelButton = (e) => {
    e.preventDefault()
    history.push("/myspots")
  }


  if (!Object.values(spot).length) return null

  return (
    <>
      <div>
        {hasSubmitted && errors?.map((error)=>(<div key={error}>{error}</div>))}
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
            {/* <label>
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
            </label> */}
            <label>
              Description:
              <textarea
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
            {/* <label>
              Image URL:
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label> */}
        </div>

        <button disabled={errors.length > 0 ? true : false}>
          Update
        </button>

        <button onClick={cancelButton}>Cancel</button>
      </form>
      {console.log("EditSpot COMPONENT ENDS")}
    </>
  )
}

export default EditSpot
