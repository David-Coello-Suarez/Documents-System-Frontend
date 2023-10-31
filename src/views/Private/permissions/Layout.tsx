import { useEffect } from "react"
import { AddButton } from "../../../components/views"
import { useAppDispatch } from "../../../hooks"
import ModuloAcceso from "./ModuloAcceso"
import PerfilLista from "./PerfilLista"
import { clean_perfil_active } from "../../../reducers/perfil"
import ModuloPermiso from "./ModuloPermiso"

const Layout = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(clean_perfil_active())
    }
  }, [dispatch])

  return (
    <>
      <AddButton titleWindows="Perfiles y permisos" />

      <div className="row">
        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3">
          <PerfilLista />
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8 col-xl-9">
          <ModuloAcceso />
          <ModuloPermiso />
        </div>
      </div>
    </>
  )
}

export default Layout
