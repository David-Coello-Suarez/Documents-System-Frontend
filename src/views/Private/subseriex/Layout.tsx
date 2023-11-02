import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { AddButton } from "../../../components/views"
import Subseriex from "./Subseriex"
import { get_subsers } from "../../../controllers/subser"
import { clean_subsers } from "../../../reducers/subser"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  const btnMsg = "Crear nueva sub serie"

  useEffect(() => {
    dispatch(get_subsers())

    return () => {
      dispatch(clean_subsers())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Sub Series"
        handleClickAdd={handleAdd}
        msgButton={btnMsg}
      />
      <Subseriex handleClickAdd={handleAdd} btnMsg={btnMsg} />
    </>
  )
}

export default Layout
