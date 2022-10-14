import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileButton from "./ProfileButton"
import FunctionButton from "./FunctionButton"
// import logo from "../../images/logo.jpg" //blue
import logo from "../../images/logo2.jpg" //pink
import "./Navigation.css"
import LoginFormModal from "../LoginFormModal"


const Navigation = ({ isLoaded }) => {
  const currentUser = useSelector(state => state.session.user)

  const [showLoginModal, setShowLoginModal] = useState(false)

  let sessionLinks

  if (currentUser) {
    sessionLinks = (
      <ProfileButton user={currentUser} />
    )
  } else {
    sessionLinks = (
      <FunctionButton
        // showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
    )
  }

  return (
    <div>
        <div className="hide">
          <LoginFormModal
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
        </div>
        {/* <div className="rawaha"> div.rawaha </div> */}

        <NavLink exact to="/">
          <img className="logo" src={logo} />
        </NavLink>

        {/* {isLoaded && ( // breaks DemoUser */ }
          <div className="sessionlinks">
            {sessionLinks}
          </div>
        {/* )} */}

        <div className="headerbreak"></div>
    </div>
  )
}

export default Navigation
