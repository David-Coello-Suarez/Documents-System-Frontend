import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { get_tipdocs } from "../../../controllers/tipdoc"
import { clean_tipdocs } from "../../../reducers/tipdoc"
import { AddButton } from "../../../components/views"
import Tipdoc from "./Tipdoc"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  const btnMsg = "Crear nuevo Tipo Doc."

  useEffect(() => {
    dispatch(get_tipdocs())

    return () => {
      dispatch(clean_tipdocs())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Tipo Documental"
        handleClickAdd={handleAdd}
        msgButton={btnMsg}
      />
      <Tipdoc handleClickAdd={handleAdd} btnMsg={btnMsg} />
    </>
  )
}

export default Layout
