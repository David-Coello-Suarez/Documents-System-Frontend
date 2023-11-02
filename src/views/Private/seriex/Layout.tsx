import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AddButton } from "../../../components/views"
import Seriex from "./Seriex"
import { useAppDispatch } from "../../../hooks"
import { get_seriexs } from "../../../controllers/seriex"
import { clean_seriexs } from "../../../reducers/seriex"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  useEffect(() => {
    dispatch(get_seriexs())

    return () => {
      dispatch(clean_seriexs())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Series"
        handleClickAdd={handleAdd}
        msgButton="Crear nueva serie"
      />
      <Seriex handleClickAdd={handleAdd} />
    </>
  )
}

export default Layout
