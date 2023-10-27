import { useEffect } from "react"
import { AddButton } from "@/components/iu"
import { useNavigate } from "react-router-dom"
import Listado from "./Listado"
import { useAppDispatch } from "@/hooks/index"
import { get_profil_manten } from "@/controllers/profil"

const Layout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAddProflie = () => navigate("add")

  useEffect(() => {
    dispatch(get_profil_manten())
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Crear nuevo perfil"
        handleClickAdd={handleAddProflie}
        msgButton="Añadir nuevo perfil"
      />

      <Listado handleClickAdd={handleAddProflie} />
    </>
  )
}

export default Layout
