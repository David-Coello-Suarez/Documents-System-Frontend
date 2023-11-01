import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { AddButton } from "../../../components/views"
import Subsection from "./Subsection"
import { get_subsecs } from "../../../controllers/subsec"
import { clean_subsecs } from "../../../reducers/subsec"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  useEffect(() => {
    dispatch(get_subsecs())

    return () => {
      dispatch(clean_subsecs())
    }
  }, [dispatch])

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
