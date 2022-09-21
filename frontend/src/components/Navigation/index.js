import React, { useState } from "react"
import { NavLink, Link, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileButton from "./ProfileButton"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"
import DemoUser from "../DemoUser"
import "./Navigation.css"


function Navigation({ isLoaded }){
  console.log("1 COMPONENT-NAVIGATION RUNNING")
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
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
