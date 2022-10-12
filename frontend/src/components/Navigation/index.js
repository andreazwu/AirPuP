import React, { useState } from "react"
import { NavLink, Link, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileButton from "./ProfileButton"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"
import DemoUser from "../DemoUser"
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
        <LoginFormModal />
        <SignupFormModal />
        <DemoUser />
      </>
    )
  }

  return (
    <div>
      <ul>

        <div className="home-logo">
          <li>
            <i className="fa fa-tree" aria-hidden="true"></i>
            <NavLink exact to="/">FodlanBnB</NavLink>
            {isLoaded && sessionLinks}
          </li>
        </div>

        <div className="navbar">
          <Link to="/new">Become A Host</Link>
        </div>

      </ul>
    </div>

  )
}

export default Navigation
