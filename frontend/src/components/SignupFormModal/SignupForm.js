import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import * as sessionActions from "../../store/session"

import "./SignupForm.css"

function SignupFormPage({onClose, setShowSignupModal}) {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastname] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState([])

  const currentUser = useSelector((state) => state.session.user)

  if (currentUser) {
    return <Redirect to="/" />
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      setErrors([])
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(() => {
          setShowSignupModal(false)
        })
        .catch(async (res) => {
            const data = await res.json()
            const errArr = Object.values(data.errors)
            if (data && errArr.length) setErrors(errArr)
          })
    }
    return setErrors(["Please Confirm Password"])
  }

  return (
    <form onSubmit={handleSubmit}>

      {/* // doesn't need x button
      <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
      </button> */}

        <div className="modal-header">Sign Up</div>
        <div className="line-break"></div>

        <div className="modal-subheader">Welcome to AirPuP</div>


      <div className="field-errors">
        {errors.length > 0 &&
        errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </div>

      <div className="form-input-wrapper">
      <label className="field">
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <div className="form-input-break"></div>
      <label className="field">
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <div className="form-input-break"></div>
      <label className="field">
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </label>
      <div className="form-input-break"></div>
      <label className="field">
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </label>
      <div className="form-input-break"></div>
      <label className="field">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div className="form-input-break"></div>
      <label className="field">
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <button className="modal-submit-button" type="submit">Sign Up</button>
    </form>
  )
}

export default SignupFormPage
