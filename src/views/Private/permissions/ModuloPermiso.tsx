import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import {
  get_permis_cabece,
  post_modulo_permis,
} from "../../../controllers/permis"
import { clean_permiso_modulo } from "../../../reducers/permis"

const ModuloPermiso = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(get_permis_cabece())

    return () => {
      dispatch(clean_permiso_modulo())
    }
  }, [dispatch])

  const { perfil_active } = useAppSelector((state) => state.perfil)

  const { permis_cabece, permis_modulo } = useAppSelector(
    (state) => state.permis,
  )

  return (
    <>
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th>Permiso del módulo</th>
            {permis_cabece.map((cabper) => (
              <th className="text-center" key={cabper.permis_permis}>
                <span className="text-capitalize">{cabper.permis_nombre}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permis_modulo.length === 0 && (
            <tr>
              <td colSpan={permis_cabece.length + 1} className="text-center">
                SELECCIONA UN MÓDULO
              </td>
            </tr>
          )}

          {permis_modulo.map((sdb) => (
            <tr key={sdb.sideba_sideba}>
              <td>{sdb.sideba_nombre}</td>
              {permis_cabece.map((cb) => (
                <td key={cb.permis_permis} className="text-center">
                  {sdb.sideba_permis.map((md, x) => {
                    const data = {
                      perfil: perfil_active,
                      modulo: sdb.sideba_sideba,
                      permis: `flg_${cb.permis_nombre.toLowerCase()}`,
                    }

                    const handleClick = () => dispatch(post_modulo_permis(data))

                    return (
                      md[data.permis] != undefined && (
                        <input
                          type="checkbox"
                          key={x}
                          onChange={handleClick}
                          checked={Boolean(md[data.permis])}
                        />
                      )
                    )
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ModuloPermiso
