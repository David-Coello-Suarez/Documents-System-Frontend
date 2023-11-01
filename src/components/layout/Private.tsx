import { Navigate, Outlet } from "react-router-dom"
import { AppNavbar, AppSidebar } from "../iu"
import { useAppSelector } from "../../hooks"

const Private = () => {
  const { token } = useAppSelector((state) => state.loggin.usuario_loggin)

  const loggout = Boolean(token.length == 0)

  if (loggout) return <Navigate to={"/"} />

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
