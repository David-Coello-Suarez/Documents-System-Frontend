import { useNavigate } from "react-router-dom"
import { AddButton } from "../../../components/iu"
import Lista from "./Lista"

const Layout = () => {
  const navigate = useNavigate()

  const handleClickAdd = () => navigate("add")

  return (
    <>
      <AddButton
        handleClickAdd={handleClickAdd}
        msgButton="Añadir Nuevo Fondo Documental"
        titleWindows="Fondo Documental"
      />

      <Lista handleClickAdd={handleClickAdd} />
    </>
  )
}

export default Layout
