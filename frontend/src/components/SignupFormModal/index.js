import React, { useState } from "react"
import { Modal } from '../../context/Modal'
import SignupFormPage from './SignupForm'

import './SignupForm.css'

function SignupFormModal({showSignupModal, setShowSignupModal}) {
  // const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Sign Up</button> */}

      {/* <div className="signup-button" onClick={() => setShowModal(true)}>
        Sign Up
      </div> */}

      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupFormPage
            // onClose={() => setShowSignupModal(false)}
            setShowSignupModal={setShowSignupModal}/>
        </Modal>
      )}
    </>
  )
}

export default SignupFormModal
