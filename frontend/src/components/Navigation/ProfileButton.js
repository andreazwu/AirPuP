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

  useEffect(() => {

  }, [user])

  const logoutUser = (e) => {
    e.preventDefault()
    dispatch(logout())
  }


  return (
    <>
      <div className="wrapper">

        <button onClick={openMenu} className="pfbutton">
            <i id='bars' className="fa-solid fa-bars"></i>
            <i className="fa-solid fa-user"></i>
        </button>

        {
          showMenu && (

          <div className="pfdropdown">

            <div className="currentuser-wrapper">
              {console.log("PROFILEBUTTON COMP: USER:", user)}
              <div className="currentuser">{user.username}</div>
              <div className="currentuser">{user.email}</div>
            </div>

            <div className='middleline'></div>

            <div className="menu-select">
              <div onClick={()=>history.push("/newspot")}>Host New Spot</div>
            </div>

            <div className="menu-select">
              <div onClick={()=>history.push("/myspots")}>My Spots</div>
            </div>

            <div className="menu-select">
              <div >My Reviews</div>
            </div>

            <div className="menu-select">
              <div onClick={logoutUser}>Log Out</div>
            </div>


          </div>

        )}

      </div>
    </>
  )
}

export default ProfileButton
