import { memo } from "react"

const AppUser = () => {
  return (
    <>
      <a
        href="#"
        className="dropdown-toggle nav-link user-link"
        data-toggle="dropdown"
      >
        <span className="user-img">
          <img
            className="rounded-circle"
            src="assets/img/user.jpg"
            width="40"
            alt="Admin"
          />
          <span className="status online"></span>
        </span>
        <span className="m-l-5">Admin</span>
      </a>
      <div className="dropdown-menu">
        {/* <a className="dropdown-item" href="profile.html">
          My Profile
        </a>
        <a className="dropdown-item" href="edit-profile.html">
          Edit Profile
        </a>
        <a className="dropdown-item" href="settings.html">
          Settings
        </a> */}
        <a className="dropdown-item">Cerrar Sesion</a>
      </div>
    </>
  )
}

export default memo(AppUser)
