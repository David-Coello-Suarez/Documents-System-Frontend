import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { get_permisos } from "@/controllers/permis"

const Permisos = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(get_permisos())
  }, [])

  const { permis_perall } = useAppSelector((state) => state.permis)

  const { sideba_permis } = useAppSelector((state) => state.sideba)

  return (
    <>
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th>Permiso del módulo</th>
            {permis_perall.map((modper) => (
              <th className="text-center" key={modper.permis_permis}>
                <span className="text-capitalize">{modper.permis_nombre}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sideba_permis.map((sdb) => (
            <tr>
              <td>{sdb.sideba_nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Permisos
