import { useNavigate } from "react-router-dom"
import { AddButton } from "../../../components/views"
import Series from "./Subseries"

const Layout = () => {
  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  const btnMsg = "Crear nueva sub serie"

  return (
    <>
      <AddButton
        titleWindows="Sub Series"
        handleClickAdd={handleAdd}
        msgButton={btnMsg}
      />
      <Series handleClickAdd={handleAdd} btnMsg={btnMsg} />
    </>
  )
}

export default Layout
