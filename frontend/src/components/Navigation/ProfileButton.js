import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { logout } from "../../store/session"

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false)

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return

    const closeMenu = () => setShowMenu(false)

    document.addEventListener("click", closeMenu)
    // MUST include cleanup fn
    return () => document.removeEventListener("click", closeMenu)
  }, [showMenu])


  const logoutUser = (e) => {
    e.preventDefault()
    dispatch(logout())
  }


  return (
    <>
      <div className="dropdown">

        {/* <div className="pfbuttonwrapper"> */}
          <button onClick={openMenu} className="pfbutton">
              <i id='bars' className="fa-solid fa-bars"></i>
              <i className="fa-solid fa-user"></i>
          </button>
        {/* </div> */}

        {
          showMenu && (
          <ul className= "profile-dropdown" >
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logoutUser}>Log Out</button>
            </li>
          </ul>
        )}

      </div>
    </>
  )
}

export default ProfileButton
