import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { AddButton } from "../../../components/views"
import { get_subscts } from "../../../controllers/subsct"
import Subsct from "./Subsct"
import { clean_subscts } from "../../../reducers/subsct"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  const btnMsg = "Crear nuevo Sub Sector"

  useEffect(() => {
    dispatch(get_subscts())

    return () => {
      dispatch(clean_subscts())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Sub Sector"
        handleClickAdd={handleAdd}
        msgButton={btnMsg}
      />
      <Subsct handleClickAdd={handleAdd} btnMsg={btnMsg} />
    </>
  )
}

export default Layout
