import { useAppSelector } from "@/hooks/index"

const Permisos = () => {
  const { sideba_mensid } = useAppSelector((state) => state.sideba)

  const permisos = [
    "Leer",
    "Escribir",
    "Crear",
    "Borrar",
    "Importar",
    "Exportar",
  ]

  return (
    <>
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th>Permiso del módulo</th>
            {permisos.map((modper, idx) => (
              <th className="text-center" key={idx}>
                {modper}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sideba_mensid.map((sdm) => (
            <tr key={sdm.sideba_sideba}>
              <td>{sdm.sideba_nombre}</td>
              {permisos.map((pm, idx) => (
                <td className="text-center" key={idx}>
                  <input
                    type="checkbox"
                    checked
                    name={pm}
                    value={sdm.sideba_sideba}
                  />
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
