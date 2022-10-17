import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileButton from "./ProfileButton"
import FunctionButton from "./FunctionButton"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"

// import logo from "../../images/logo.jpg" //blue
import logo from "../../images/logo2.jpg" //pink

import "./Navigation.css"

const Navigation = ({ isLoaded }) => {
  const currentUser = useSelector(state => state.session.user)

  // move modal states here from nested
  // Nav --> FnButton ( <loginmodal>, <signupmodal> )
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false);

  let sessionLinks

  if (currentUser) {
    sessionLinks = (
      <ProfileButton user={currentUser} />
    )
  } else {
    sessionLinks = (
      <FunctionButton
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />
    )
  }

  return (
    <div>

        <LoginFormModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />

        <SignupFormModal
          showSignupModal={showSignupModal}
          setShowSignupModal={setShowSignupModal}
        />

        {/* <div className="rawaha"> div.rawaha shortcut </div> */}

        <NavLink exact to="/">
          <img className="logo" src={logo} />
        </NavLink>

        {/* {isLoaded && ( //bug */ }
          <div className="sessionlinks">
            {sessionLinks}
          </div>
        {/* )} */}

        <div className="headerbreak"></div>
    </div>
  )
}

export default Navigation
