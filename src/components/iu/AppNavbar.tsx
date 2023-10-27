import { memo } from "react"
import { Link } from "react-router-dom"
import { AppUser } from "."

const AppNavbar = () => {
  return (
    <div className="header">
      <div className="header-left">
        <Link to={"."} className="logo">
          <img src="/assets/img/logo.png" width="35" height="35" />{" "}
          <span>G.D.</span>
        </Link>
      </div>
      <a
        style={{ cursor: "pointer" }}
        id="mobile_btn"
        className="mobile_btn float-start"
        // onClick={handleSetSidebar}
      >
        <span className="material-symbols-outlined">menu</span>
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
