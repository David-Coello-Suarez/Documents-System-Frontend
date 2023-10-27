import { useEffect } from "react"
import {
  get_cabecera_permisos,
  post_permiso_modulo,
} from "@/controllers/permis"
import { useAppDispatch, useAppSelector } from "@/hooks/index"

const Permisos = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(get_cabecera_permisos())

    return () => {}
  }, [])

  const { permis_permod, permis_cabece } = useAppSelector(
    (state) => state.permis,
  )

  const { perfil_active } = useAppSelector((state) => state.perfil)

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
          {permis_permod.map((sdb) => (
            <tr key={sdb.sideba_sideba}>
              <td>{sdb.sideba_nombre}</td>
              {permis_cabece.map((cb) => (
                <td key={cb.permis_permis} className="text-center">
                  {sdb.sideba_permis.map((md) => {
                    const data = {
                      perfil: perfil_active,
                      modulo: sdb.sideba_sideba,
                      permis: `flg_${cb.permis_nombre.toLowerCase()}`,
                    }

                    const handleClick = () =>
                      dispatch(post_permiso_modulo(data))

                    return (
                      md[data.permis] != undefined && (
                        <input
                          type="checkbox"
                          key={md.permis_permis}
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

export default Permisos
