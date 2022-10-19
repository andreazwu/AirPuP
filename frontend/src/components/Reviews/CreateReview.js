import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNewReview } from "../../store/reviews"

import "./Reviews.css"

const CreateReview = ({spotId}) => {
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault()


    dispatch(thunkCreateNewReview(newreview, spotId, user))
  }

  return (
    <div>

    </div>
  )
}

export default CreateReview
