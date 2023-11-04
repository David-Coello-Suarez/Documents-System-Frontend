import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { get_ubicacs } from "../../../controllers/ubicac"
import { clean_ubicacs } from "../../../reducers/ubicac"
import { AddButton } from "../../../components/views"
import Ubicac from "./Locati"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  const btnMsg = "Crear nuevo ubicación"

  useEffect(() => {
    dispatch(get_ubicacs())

    return () => {
      dispatch(clean_ubicacs())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Ubicación"
        handleClickAdd={handleAdd}
        msgButton={btnMsg}
      />
      <Ubicac handleClickAdd={handleAdd} btnMsg={btnMsg} />
    </>
  )
}

export default Layout
