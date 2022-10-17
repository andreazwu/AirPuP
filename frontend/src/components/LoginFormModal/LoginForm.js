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
      // .then(() => setShowLoginModal(false))
      .then(onClose)
      .catch(
        // come back and implement errror message
        async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        }
      )
  }

  return (
    <div className="modal-wrapper">
      <form onSubmit={handleSubmit}>
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button id="login-button" type="submit">Log In</button>
      </form>
    </div>
  )
}

export default LoginForm
