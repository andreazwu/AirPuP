import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import LoginForm from "./LoginForm"

import "./LoginForm.css"


function LoginFormModal({showLoginModal, setShowLoginModal}) {
  // const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}

      {/* <div className="login-button"
          onClick={() => setShowLoginModal(true)}>
        Log In
      </div> */}

      {/* doesn't have to pass in setShowLoginModal prop, passing in onClose instead is fine */}
      {showLoginModal && (
        <Modal
        className="modal-wrapper"
        onClose={() => setShowLoginModal(false)}>
          <LoginForm
            // onClose={() => setShowLoginModal(false)}
            setShowLoginModal={setShowLoginModal}
          />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal
