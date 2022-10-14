import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import LoginForm from "./LoginForm"
import "./LoginForm.css"


function LoginFormModal() {
  console.log("LOGINFORMMODAL COMPONENT STARTS")
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}

      <div className="login-button"
          onClick={() => setShowModal(true)}>
        Log In
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal
