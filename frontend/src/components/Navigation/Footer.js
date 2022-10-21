import React from "react"
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer-wrapper">
    <div className="footer-container">
      <div className="footer-left">
        © 2022 AirPuP &nbsp;·&nbsp; an AirBnB clone
        by <span>Andrea Wu&nbsp;</span>
      </div>

      <div className="footer-right">
        <span className="social-link">
          <a href="https://github.com/andreazwu"
          target="blank"
          style={{ textDecoration: "none" }}
          >
            &nbsp;<i className="fa-brands fa-github"></i>
            {/* &nbsp; Andrea Wu &nbsp; */}
            &nbsp; GitHub &nbsp;
          </a>
        </span>

        <span className="social-link">
          <a href="https://www.linkedin.com/in/andreazwu/"
          target="blank"
          style={{ textDecoration: "none"}}
          >
            <i className="fa-brands fa-linkedin"></i>
            &nbsp; LinkedIn &nbsp;
          </a>
        </span>
      </div>
    </div>
    </div>
  )
}

export default Footer
