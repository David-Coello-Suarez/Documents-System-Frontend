import { AddButton } from "@/components/iu"
import Listado from "./Listado"
import { useNavigate } from "react-router-dom"

const Layout = () => {
  const navigate = useNavigate()

  const handleAddUsuario = () => navigate("add")

  return (
    <>
      <AddButton
        titleWindows="Usuario"
        msgButton="Añadir Usuario"
        handleClickAdd={handleAddUsuario}
      />

      <Listado handleClickAdd={handleAddUsuario} />
    </>
  )
}

export default Layout
