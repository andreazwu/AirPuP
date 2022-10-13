import React from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import "./DemoUser.css"

const DemoUser = () => {
  console.log("DEMOUSER COMPONENT STARTS")
  const dispatch = useDispatch()

  const loginDemoUser = () => {
    return dispatch(login({
      credential: "Demo-lition1",
      password: "password1"
    }))
  }
  // const loginDemoUser = async () => {
  //   return await dispatch(login({
  //     credential: "Demo-lition1",
  //     password: "password1"
  //   }))
  // }

  return (
    <>
      <div id="demo-user" onClick={loginDemoUser}>
        Login as Demo User
      </div>
    </>
  )
}

export default DemoUser
