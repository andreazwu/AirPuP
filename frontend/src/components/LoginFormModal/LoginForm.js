import React, { useState } from "react"
import { useDispatch } from "react-redux"
import * as sessionActions from "../../store/session"

import "./LoginForm.css"

function LoginForm({onClose, setShowLoginModal}) {
  const dispatch = useDispatch()

  const [credential, setCredential] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowLoginModal(false))
      // .then(onClose)
      .catch(
        // come back and implement errror message
        async (res) => {
          const data = await res.json()
          if (data && data.message) setErrors([data.message])
        }
      )
  }

  return (
    <div className="modal-wrapper">
      <form onSubmit={handleSubmit}>
        {/* //don't need x button
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button> */}

        <div className="modal-header">Log In</div>
        <div className="line-break"></div>

        <div className='modal-subheader'>Welcome to AirPuP</div>

        <div className='login-errors'>
          {errors && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>

        <div className="form-input-wrapper">
        <label className="login">
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        <div className="form-input-break"></div>

        <label className="login">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        <button className="modal-login-button" type="submit">Log In</button>
      </form>
    </div>
  )
}

export default LoginForm
