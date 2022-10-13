import React, { useState } from "react"
import * as sessionActions from "../../store/session"
import { useDispatch } from "react-redux"

import "./LoginForm.css"

function LoginForm() {
  console.log("LOGINFORM COMPONENT STARTS")
  const dispatch = useDispatch()
  const [credential, setCredential] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
      }
    )
  }

  return (
    <div className="modal-wrapper">
    <form onSubmit={handleSubmit}>
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
