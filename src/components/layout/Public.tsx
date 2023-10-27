import { Outlet } from "react-router-dom"

const Public = () => {
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
