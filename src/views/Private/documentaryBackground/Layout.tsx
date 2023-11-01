import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { AddButton } from "../../../components/views"
import Lista from "./Lista"
import { get_fondocs } from "../../../controllers/fondoc"
import { clean_fondocs } from "../../../reducers/fondoc"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleClickAdd = () => navigate("add")

  useEffect(() => {
    dispatch(get_fondocs())

    return () => {
      dispatch(clean_fondocs())
    }
  }, [dispatch])

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
