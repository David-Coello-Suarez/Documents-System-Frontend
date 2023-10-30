import { memo } from "react"
import { Link } from "react-router-dom"
import { AppUser } from "."

const AppNavbar = () => {
  return (
    <div className="header">
      <div className="header-left">
        <Link to={"."} className="logo">
          <img src="/assets/img/logo_ico.png" width="35" height="35" />{" "}
          <span>Documents</span>
        </Link>
      </div>
      <a
        style={{ cursor: "pointer" }}
        id="mobile_btn"
        className="mobile_btn float-start"
        // onClick={handleSetSidebar}
      >
        <i className="fa fa-list-ul" />
      </a>

      <ul className="nav user-menu float-right">
        <li className="nav-item dropdown">{/* <AppNotification /> */}</li>

        <li className="nav-item dropdown">{/* <AppMessage /> */}</li>

        <li className="nav-item dropdown has-arrow">
          <AppUser />
        </li>
      </ul>
    </div>
  )
}

export default memo(AppNavbar)
