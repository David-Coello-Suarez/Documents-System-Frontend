import { AddButton } from "@/components/iu"
import RolList from "./RolList"
import Modulo from "./moduloPermisos/Modulo"
import Permisos from "./moduloPermisos/Permisos"

const Layout = () => {
  return (
    <>
      <AddButton titleWindows="Perfiles y permisos" />

      <div className="row">
        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3">
          <RolList />
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8 col-xl-9">
          <Modulo />
          <Permisos />
        </div>
      </div>
    </>
  )
}

export default Layout
