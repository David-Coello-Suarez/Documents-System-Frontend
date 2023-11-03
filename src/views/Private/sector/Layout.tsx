import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks"
import { AddButton } from "../../../components/views"
import Sector from "./Sector"
import { get_sectors } from "../../../controllers/sector"
import { clean_sectors } from "../../../reducers/sector"

const Layout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAdd = () => navigate("add")

  const btnMsg = "Crear nuevo Sector"

  useEffect(() => {
    dispatch(get_sectors())

    return () => {
      dispatch(clean_sectors())
    }
  }, [dispatch])

  return (
    <>
      <AddButton
        titleWindows="Sector"
        handleClickAdd={handleAdd}
        msgButton={btnMsg}
      />
      <Sector handleClickAdd={handleAdd} btnMsg={btnMsg} />
    </>
  )
}

export default Layout
