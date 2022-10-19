import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNewReview, thunkAddReviewImage } from "../../../store/reviews"

import "./CreateReview.css"

const CreateReview = ({spotId, setShowModal}) => {
  console.log("CREATEREVIEW COMPONENT STARTS:")

  const dispatch = useDispatch()
  const history = useHistory()

  const [review, setReview] = useState("")
  const [stars, setStars] = useState(5)
  const [errors, setErrors] = useState([])
  const [url, setUrl] = useState("")

  const [hasSubmitted, setHasSubmitted] = useState(false)


  const currentUser = useSelector((state) => state.session.user)

  useEffect(() => {
    console.log("USE EFFECT TO CHECK CURRENT USER", currentUser)
    if (currentUser) setErrors([])
    else setErrors(["You must be logged in to leave a review"])
  }, [currentUser])


  const handleSubmit = async (e) => {
    console.log("COMPONENT HANDLESUBMIT STARTS")
    e.preventDefault()
    setErrors([])
    setHasSubmitted(true)

    const errorsArr = []

    if (!review.length || review.length > 255) errorsArr.push("please enter a valid review fewer than 255 characters long")
    if (url.length && (url.length > 255 || !url.includes(".jpg"||".jpeg"||".png"||".gif"))) errorsArr.push("please enter a valid image url fewer than 255 characters long")

    setErrors(errorsArr)

    if (errorsArr.length) return

    const reviewInfo = { review, stars, url }

    // console.log("COMPONENT HANDLESUBMIT, BEFORE DISPATCH THUNK, REVIEWINFO:", reviewInfo)

    const newReview = await dispatch(thunkCreateNewReview(reviewInfo, spotId, currentUser))

    if (newReview && !url.length) setShowModal(false)

    if (newReview && url.length && !errorsArr.length) {
      // console.log("COMPONENT HANDLESUBMIT, AFTER THUNK RETURNS: NEWREVIEW:", newReview)

      const imageObj = ({url: url})

      // console.log("COMPONENT HANDLESUBMIT, BEFORE DISPATCH THUNK FOR ADD REVIEW IMAGE, IMAGEOBJ:", imageObj)

      await dispatch(thunkAddReviewImage(newReview.id, imageObj))
      .then(()=>setShowModal(false))

      reset()
      history.push(`/spots/${spotId}`)
    }
    // console.log("COMPONENT HANDLESUBMIT ENDS")
  }

  const reset = () => {
    setReview("")
    setStars(5)
    setUrl("")
    setErrors([])
    setHasSubmitted(false)
  }

  return (
    <div>
      <div>
        {
        hasSubmitted &&
        errors?.map((error)=>(<div key={error}>{error}</div>))
        }
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Please Enter Your Review Info: </h2>

        <div className="create-review-container">

            <label>
              Review:
              <input
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </label>
            <label>
              Stars:
              <select
                type="number"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              >
                {[0,1,2,3,4,5].map((num)=>(<option>{num}</option>))}
              </select>
            </label>
            <label>
              Image URL:
              <input
                type="text"
                value={url}
                placeholder="optional"
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
        </div>

        <button
        // disabled={
        //   hasSubmitted &&
        //   errors.length > 0 ? true : false
        // }
        >
          Create Review
        </button>

        {/* <button onClick={cancelButton}>Cancel</button> */}
      </form>





    </div>
  )
}

export default CreateReview
