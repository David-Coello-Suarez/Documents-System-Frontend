import { useNavigate } from "react-router-dom"
import { AddButton } from "../../../components/views"
import Subsection from "./Subsection"

const Layout = () => {
  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  return (
    <>
      <AddButton
        titleWindows="Subsecciones"
        handleClickAdd={handleAdd}
        msgButton="Crear nueva subsección"
      />
      <Subsection handleClickAdd={handleAdd} />
    </>
  )
}

export default Layout
