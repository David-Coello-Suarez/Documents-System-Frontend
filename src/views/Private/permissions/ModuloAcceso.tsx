import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import {
  get_modulo_perfil,
  post_modulo_acceso,
} from "../../../controllers/permis"
import { clean_modulo } from "../../../reducers/permis"

const ModuloAcceso = () => {
  const dispatch = useAppDispatch()

  const { perfil_active } = useAppSelector((state) => state.perfil)

  useEffect(() => {
    if (perfil_active > 0) {
      dispatch(get_modulo_perfil(perfil_active))
    }
  }, [perfil_active])

  useEffect(() => {
    return () => {
      dispatch(clean_modulo())
    }
  }, [dispatch])

  const { modulo_modulo } = useAppSelector((state) => state.permis)

  return (
    <>
      <h6 className="card-title m-b-10">
        Acceso al módulo <small className="text-danger text-ellipsis"></small>
      </h6>

      <div className="m-b-20">
        <ul className="list-group">
          {perfil_active === 0 && (
            <li className="list-group-item text-center">
              {" "}
              SELECCIONA UN PERFIL{" "}
            </li>
          )}

          {modulo_modulo.map((md) => {
            const input_name = md.sideba_nombre.replaceAll(" ", "_")

            const modulo = {
              perfil: perfil_active,
              modulo: md.sideba_sideba,
            }

            const handleChange = () => dispatch(post_modulo_acceso(modulo))

            return (
              <li className="list-group-item" key={md.sideba_sideba}>
                {md.sideba_nombre}
                <div className="material-switch float-right">
                  <input
                    id={input_name}
                    type="checkbox"
                    value={md.sideba_sideba}
                    checked={Boolean(md.sideba_cheper)}
                    readOnly
                    onClick={handleChange}
                  />
                  <label htmlFor={input_name} className="badge-success"></label>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default ModuloAcceso
