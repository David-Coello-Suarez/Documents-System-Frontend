import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { getProfil } from "../../../controllers/profil"
import { Link } from "react-router-dom"
import { clear_perfiles, set_pefil_active } from "../../../reducers/perfil"

const RolList = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProfil())

    return () => {
      dispatch(clear_perfiles())
    }
  }, [])

  return (
    <>
      <Link to={"../profiles/add"} className="btn btn-primary btn-block w-100">
        <i className="fa fa-plus m-r-5"></i>
        Añadir Perfil
      </Link>

      <div className="roles-menu">
        <ul>
          {perfil_perfil.map((pf) => {
            const classStyle =
              pf.profil_profil === perfil_active ? "active" : ""

            const handleClickSelect = () =>
              dispatch(set_pefil_active(pf.profil_profil))

            return (
              <li
                key={pf.profil_profil}
                className={`${classStyle}`}
                onClick={handleClickSelect}
              >
                <a>{pf.profil_nampro}</a>
                <span className="role-action"></span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default RolList
