import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { get_ingcajs } from "../../../controllers/ingcaj"
import { clean_ingcajs } from "../../../reducers/ingcaj"
import { AddButton } from "../../../components/views"
import IngCaj from "./IngCaj"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  const btnMsg = "Ingresar nueva caja"

  useEffect(() => {
    dispatch(get_ingcajs())

    return () => {
      dispatch(clean_ingcajs())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Ingreso Cajas"
        handleClickAdd={handleAdd}
        msgButton={btnMsg}
      />

      <IngCaj handleClickAdd={handleAdd} btnMsg={btnMsg} />
    </>
  )
}

export default Layout
