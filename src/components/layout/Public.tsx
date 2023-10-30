import { useAppSelector } from "@/hooks/useAppSelector"
import { Navigate, Outlet } from "react-router-dom"

const Public = () => {
  const { token } = useAppSelector((state) => state.loggin.usuario_loggin)

  const loggout = Boolean(token.length > 0)

  if (loggout) return <Navigate to={"/dash"} />

  return (
    <>
      <div className="main-wrapper account-wrapper">
        <div className="account-page">
          <div className="account-center">
            <div className="account-box">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Public
