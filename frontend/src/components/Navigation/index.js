import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileButton from "./ProfileButton"
import FunctionButton from "./FunctionButton"
import logo from "../../images/logo.jpg"

import "./Navigation.css"


const Navigation = ({ isLoaded }) => {
  const currentUser = useSelector(state => state.session.user)

  let sessionLinks

  if (currentUser) {
    sessionLinks = (
      <ProfileButton user={currentUser} />
    )
  } else {
    sessionLinks = (
      <>
        <FunctionButton />
      </>
    )
  }

  return (
    <div>

        <NavLink exact to="/">
          <img className="logo" src={logo} />
        </NavLink>

        {isLoaded && (
          <div className="sessionlinks">
            {sessionLinks}
          </div>
        )}

    </div>
  )
}

export default Navigation
