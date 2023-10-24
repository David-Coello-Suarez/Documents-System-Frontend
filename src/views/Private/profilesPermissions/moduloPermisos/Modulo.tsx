import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { getSidebaMenu } from "@/controllers/sidebar"
import { clean_sidmen } from "@/reducers/sideba"

const Modulo = () => {
  const dispath = useAppDispatch()

  const { sideba_mensid } = useAppSelector((state) => state.sideba)

  useEffect(() => {
    dispath(getSidebaMenu())

    return () => {
      dispath(clean_sidmen())
    }
  }, [])

  return (
    <>
      <h6 className="card-title m-b-20">Acceso al módulo</h6>

      <div className="m-b-30">
        <ul className="list-group">
          {sideba_mensid.map((ms) => {
            const input_name = ms.sideba_nombre.replaceAll(" ", "_")
            return (
              <li className="list-group-item" key={ms.sideba_sideba}>
                {ms.sideba_nombre}
                <div className="material-switch float-right">
                  <input
                    id={input_name}
                    type="checkbox"
                    value={ms.sideba_sideba}
                    checked
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
