// import React, { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useHistory, useParams } from "react-router-dom"
// import { thunkEditSpot, thunkGetOneSpot, thunkAddSpotImage } from "../../store/spots"

// import "./Spots.css"

// const EditSpot = () => {
//   console.log("EditSpot COMPONENT STARTS:")
//   const { spotId } = useParams()
//   const dispatch = useDispatch()
//   const history = useHistory()

//   const spot = useSelector((state) => state.spots.singleSpot)

//   // const currentUser = useSelector((state) => {
//   //   console.log("USE SELECTOR DETECTS STATE CHANGE")
//   //   return state.session.user
//   // })

//   const [address, setAddress] = useState(spot.address)
//   const [city, setCity] = useState(spot.city)
//   const [state, setState] = useState(spot.state)
//   const [country, setCountry] = useState(spot.country)
//   const [lat, setLat] = useState(spot.lat)
//   const [lng, setLng] = useState(spot.lng)
//   const [name, setName] = useState(spot.name)
//   const [description, setDescription] = useState(spot.description)
//   const [price, setPrice] = useState(spot.price)
//   const [url, setUrl] = useState(spot.SpotImages[0].url)

//   const [errors, setErrors] = useState([])
//   // const [hasSubmitted, setHasSubmitted] = useState(false)

//   // //check for logged in status
//   // useEffect(() => {
//   //   if (currentUser) setErrors([])
//   //   else setErrors(["You must be logged in to host new spot"])
//   // }, [currentUser])

//   //check for validation errors
//   useEffect(() => {
//     console.log("USE EFFECT FOR VALIDATION ERRORS STARTS")
//     let errorsArr = []

//     if (!address.length) errorsArr.push("please enter street address")
//     if (!city.length) errorsArr.push("please enter city")
//     if (!state.length) errorsArr.push("please enter state")
//     if (!country.length) errorsArr.push("please enter country")
//     // if (!lat.length || lat > 90 || lat < -90) errorsArr.push("please enter a valid latitude between -90 and 90")
//     // if (!lng.length || lng > 180 || lng < -180) errorsArr.push("please enter a valid longitude between -180 and 180")
//     if (!name.length || name.length > 50) errorsArr.push("please enter a valid name fewer than 50 characters long")
//     if (!description.length) errorsArr.push("please enter a description")
//     if (!price || price <=0) errorsArr.push("please enter a valid price greater than 0")
//     if (!url.length || url.length > 255) errorsArr.push("please enter a valid image url fewer than 255 characters long")

//     console.log("USE EFFECT FOR VALIDATION ERRORS ENDS, ERRORS ARR:", errorsArr)

//     setErrors(errorsArr)
//   }, [address, city, state, country, name, description, price, url])


//   useEffect(() => {
//     dispatch(thunkGetOneSpot(spotId))
//   }, [dispatch, spotId])

//   // handleSubmit is ASYNCHRONOUS
//   const handleSubmit = async (e) => {
//     console.log("COMPONENT HANDLESUBMIT STARTS:")
//     e.preventDefault()
//     setHasSubmitted(true)
//     // if (errors.length) alert ("Please provide a valid entry!")

//     const spot = {
//       address, city, state, country, lat: 90, lng: 90, name, description, price
//     }
//     console.log("COMPONENT HANDLESUBMIT, BEFORE DISPATCH THUNK, PAYLOAD SPOT:", spot)

//     // AWAIT thunk; returns promise (spotObj or errors)
//     const newSpot = await dispatch(thunkCreateNewSpot(spot))
//       // .then((res) => {
//       //   if (res.errors) setErrors(Object.values(res.errors))
//       //   else history.push(`/spots/${res.id}`)
//       // })


//     if (newSpot) {
//       console.log("COMPONENT HANDLESUBMIT, AFTER THUNK AC RETURNS PROMISE, NEWSPOT:", newSpot)

//       const imageObj = ({ url: url, preview: true})

//       console.log("COMPONENT HANDLESUBMIT, BEFORE DISPATCH THUNK FOR ADD SPOT IMAGE, IMAGEOBJ:", imageObj)

//       await dispatch(thunkAddSpotImage(newSpot.id, imageObj))

//       // history.push(`/spots/${newSpot.id}`) // ?? type err: cannot read properties of undefined in LoadOneSpot

//       reset()
//       history.push("/myspots")
//     }
//     console.log("COMPONENT HANDLESUBMIT ENDS")
//   }

//   const reset = () => {
//     setAddress("")
//     setCity("")
//     setState("")
//     setCountry("")
//     setLat("")
//     setLng("")
//     setName("")
//     setDescription("")
//     setPrice("")
//     setUrl("")
//     setErrors([])
//     setHasSubmitted(false)
//   }


//   return (
//     <>
//       <div>
//         {hasSubmitted && errors?.map((error)=>(<div key={error}>{error}</div>))}
//       </div>

//       <form onSubmit={handleSubmit}>
//         <h2>Please Enter Your Spot Info: </h2>

//         <div className="create-spot-container">

//             <label>
//               Name:
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </label>
//             <label>
//               Address:
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </label>
//             <label>
//               City:
//               <input
//                 type="text"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//             </label>
//             <label>
//               State:
//               <input
//                 type="text"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//               />
//             </label>
//             <label>
//               Country:
//               <input
//                 type="text"
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//               />
//             </label>
//             {/* <label>
//               Latitude:
//               <input
//                 type="number"
//                 value={lat}
//                 onChange={(e) => setLat(e.target.value)}
//               />
//             </label>
//             <label>
//               Longitude:
//               <input
//                 type="number"
//                 value={lng}
//                 onChange={(e) => setLng(e.target.value)}
//               />
//             </label> */}
//             <label>
//               Description:
//               <textarea
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </label>
//             <label>
//               Price:
//               <input
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </label>
//             <label>
//               Image URL:
//               <input
//                 type="text"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//               />
//             </label>
//         </div>

//         <button type="submit">Submit</button>

//       </form>
//       {console.log("EditSpot COMPONENT ENDS")}
//     </>
//   )
// }

// export default EditSpot
