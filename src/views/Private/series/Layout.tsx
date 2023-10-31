import { useNavigate } from "react-router-dom"
import { AddButton } from "../../../components/views"
import Series from "./Series"

const Layout = () => {
  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  return (
    <>
      <AddButton
        titleWindows="Series"
        handleClickAdd={handleAdd}
        msgButton="Crear nueva serie"
      />
      <Series handleClickAdd={handleAdd} />
    </>
  )
}

export default Layout
