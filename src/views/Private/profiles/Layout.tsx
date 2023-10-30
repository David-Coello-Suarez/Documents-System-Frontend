import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { get_perfils } from "../../../controllers/profil"
import { clean_perfiles } from "../../../reducers/perfil"
import { AddButton } from "../../../components/iu"
import Perfil from "./Perfil"

const Layout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAddProflie = () => navigate("add")

  useEffect(() => {
    dispatch(get_perfils())

    return () => {
      dispatch(clean_perfiles())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Crear nuevo perfil"
        handleClickAdd={handleAddProflie}
        msgButton="Añadir nuevo perfil"
      />

      <Perfil handleClickAdd={handleAddProflie} />
    </>
  )
}

export default Layout
