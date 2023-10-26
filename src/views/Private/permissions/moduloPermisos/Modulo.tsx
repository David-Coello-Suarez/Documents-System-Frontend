import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { getSidebaMenu, postModulo } from "@/controllers/sidebar"
import { clean_sidmen } from "@/reducers/sideba"

const Modulo = () => {
  const dispath = useAppDispatch()

  const { sideba_mensid } = useAppSelector((state) => state.sideba)
  const { perfil_active } = useAppSelector((state) => state.perfil)

  useEffect(() => {
    dispath(getSidebaMenu(perfil_active))
  }, [perfil_active])

  useEffect(() => {
    return () => {
      dispath(clean_sidmen())
    }
  }, [])

  return (
    <>
      <h6 className="card-title m-b-10">
        Acceso al módulo{" "}
        <small className="text-danger text-ellipsis">
          {perfil_active === 0 && "Seleccione perfil"}
        </small>
      </h6>

      <div className="m-b-30">
        <ul className="list-group">
          {sideba_mensid.map((ms) => {
            const input_name = ms.sideba_nombre.replaceAll(" ", "_")

            const handleChange = () =>
              dispath(
                postModulo({ perfil: perfil_active, modulo: ms.sideba_sideba }),
              )

            return (
              <li className="list-group-item" key={ms.sideba_sideba}>
                {ms.sideba_nombre}
                <div className="material-switch float-right">
                  <input
                    id={input_name}
                    type="checkbox"
                    value={ms.sideba_sideba}
                    disabled={perfil_active == 0}
                    checked={Boolean(ms.sideba_cheper)}
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

export default Modulo
