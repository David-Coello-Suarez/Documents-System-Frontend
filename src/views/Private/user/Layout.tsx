import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AddButton } from "../../../components/iu"
import { useAppDispatch } from "../../../hooks"
import { get_usuaris } from "../../../controllers/usuari"
import { clean_usuaris } from "../../../reducers/usuari"
import Usuari from "./Usuari"
import UsuariCreado from "./UsuariCreado"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAddUsuario = () => navigate("add")

  useEffect(() => {
    dispatch(get_usuaris())

    return () => {
      dispatch(clean_usuaris())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Usuario"
        msgButton="Añadir Usuario"
        handleClickAdd={handleAddUsuario}
      />

      <UsuariCreado />

      <Usuari handleClickAdd={handleAddUsuario} />
    </>
  )
}

export default Layout
