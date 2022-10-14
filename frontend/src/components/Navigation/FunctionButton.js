import React, { useState, useEffect } from "react"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"
import DemoUser from "../DemoUser"


const FunctionButton = ({setShowLoginModal}) => {
  const [showMenu, setShowMenu] = useState(false)

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return
    const closeMenu = () => setShowMenu(false)
    // this event listener includes the login button to...
    document.addEventListener("click", closeMenu)
    // MUST include cleanup fn
    return () => document.removeEventListener("click", closeMenu)
  }, [showMenu])


  return (
    <>
      <div className="wrapper">

        <button onClick={openMenu} className="pfbutton">
            <i id='bars' className="fa-solid fa-bars"></i>
            <i className="fa-solid fa-user"></i>
        </button>

        {
          showMenu && (

          <div className="logindropdown">
            <div className="login-select">
              {/* <LoginFormModal /> */}
              <div className="login-button"
          onClick={() => setShowLoginModal(true)}>
              Log In
            </div>
            </div>

            <div className="login-select">
              <SignupFormModal />
            </div>

            <div className="login-select">
              <DemoUser />
            </div>
          </div>

        )}

      </div>
    </>
  )
}

export default FunctionButton
