import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"


const FunctionButton = () => {
  const dispatch = useDispatch()
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




  return (
    <div>FunctionButton</div>
  )
}

export default FunctionButton
