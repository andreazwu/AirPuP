import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNewReview } from "../../../store/reviews"

import "./CreateReview.css"

const CreateReview = ({spotId}) => {
  const dispatch = useDispatch()

  const [review, setReview] = useState("")
  const [stars, setStars] = useState(5)
  const [errors, setErrors] = useState([])
  const [url, setUrl] = useState("")

  const [hasSubmitted, setHasSubmitted] = useState(false)


  const currentUser = useSelector((state) => state.session.user)

  useEffect(() => {
    if (currentUser) setErrors([])
    else setErrors(["You must be logged in to leave a review"])
  }, [currentUser])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    const errorsArr = []

    if (!review.length || review.length > 255) errorsArr.push("please enter a valid review fewer than 255 characters long")
    if (!url.length || url.length > 255 || !url.includes(".jpg"||".jpeg"||".png"||".gif")) errorsArr.push("please enter a valid image url fewer than 255 characters long")

    setErrors(errorsArr)

    const reviewInfo = { review, stars }

    const newReview = dispatch(thunkCreateNewReview(reviewInfo, spotId, currentUser))

    if (newReview) {
      const imageObj = ({url: url})
      await dispatch(thunkAddReviewImage(newReview.id, imageObj))
      reset()
      history.push("/myreviews")
    }
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
        {hasSubmitted && errors?.map((error)=>(<div key={error}>{error}</div>))}
      </div>





    </div>
  )
}

export default CreateReview
