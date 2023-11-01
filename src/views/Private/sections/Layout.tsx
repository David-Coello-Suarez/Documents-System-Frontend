import { useNavigate } from "react-router-dom"
import Sections from "./Sections"
import { AddButton } from "../../../components/views"
import { useEffect } from "react"
import { useAppDispatch } from "../../../hooks"
import { get_seccios } from "../../../controllers/seccio"
import { clean_seccios } from "../../../reducers/seccio"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  useEffect(() => {
    dispatch(get_seccios())

    return () => {
      dispatch(clean_seccios())
    }
  }, [dispatch])

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
