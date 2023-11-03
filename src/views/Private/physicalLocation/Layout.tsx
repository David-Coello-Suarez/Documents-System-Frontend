import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { get_localis } from "../../../controllers/locali"
import { clean_localis } from "../../../reducers/locali"
import { AddButton } from "../../../components/views"
import Locali from "./Locali"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  const btnMsg = "Crear nueva localidad"

  useEffect(() => {
    dispatch(get_localis())

    return () => {
      dispatch(clean_localis())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Localidad"
        handleClickAdd={handleAdd}
        msgButton={btnMsg}
      />
      <Locali handleClickAdd={handleAdd} btnMsg={btnMsg} />
    </>
  )
}

export default Layout
