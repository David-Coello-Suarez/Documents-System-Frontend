import { Outlet } from "react-router-dom"
import { AppNavbar, AppSidebar } from "../iu"

const Private = () => {
  return (
    <div className="main-wrapper">
      <AppSidebar />
      <AppNavbar />
      <div className="page-wrapper">
        <div className="content p-3">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Private
