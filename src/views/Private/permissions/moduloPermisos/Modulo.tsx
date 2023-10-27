import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { get_modulo, post_modulo } from "@/controllers/permis"

const Modulo = () => {
  const dispatch = useAppDispatch()

  const { perfil_active } = useAppSelector((state) => state.perfil)

  useEffect(() => {
    dispatch(get_modulo(perfil_active))
  }, [perfil_active])

  useEffect(() => {
    return () => {}
  }, [])

  const { permis_perall } = useAppSelector((state) => state.permis)

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
          {permis_perall.map((pp) => {
            const input_name = pp.sideba_nombre.replaceAll(" ", "_")

            const modulo = {
              perfil: perfil_active,
              modulo: pp.sideba_sideba,
            }

            const handleChange = () => dispatch(post_modulo(modulo))

            return (
              <li className="list-group-item" key={pp.sideba_sideba}>
                {pp.sideba_nombre}
                <div className="material-switch float-right">
                  <input
                    id={input_name}
                    type="checkbox"
                    value={pp.sideba_sideba}
                    disabled={perfil_active == 0}
                    checked={Boolean(pp.sideba_cheper)}
                    onClick={handleChange}
                  />
                  <label htmlFor={input_name} className="badge-success"></label>
                </div>
              </li>
            )
          })}
          {/* {sideba_mensid.map((ms) => {
            const input_name = ms.sideba_nombre.replaceAll(" ", "_")

            const handleChange = () =>
              dispatch(
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
          })} */}
        </ul>
      </div>
    </>
  )
}

export default Modulo
