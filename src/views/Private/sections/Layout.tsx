import { useNavigate } from "react-router-dom"
import Sections from "./Sections"
import { AddButton } from "../../../components/iu"

const Layout = () => {
  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  return (
    <>
      <AddButton
        titleWindows="Secciones"
        handleClickAdd={handleAdd}
        msgButton="Crear nueva sección"
      />
      <Sections handleClickAdd={handleAdd} />
    </>
  )
}

export default Layout
