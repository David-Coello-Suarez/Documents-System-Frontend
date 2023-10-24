import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { getSidebaMenu } from "@/controllers/sidebar"
import { clean_sidmen } from "@/reducers/sideba"

const Menu = () => {
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
      <h6 className="card-title m-b-20">Module Access</h6>

      <div className="m-b-30">
        <ul className="list-group">
          {sideba_mensid.map((ms) => (
            <li className="list-group-item" key={ms.sideba_sideba}>
              Employee
              <div className="material-switch float-right">
                <input id="staff_module" type="checkbox" />
                <label htmlFor="staff_module" className="badge-success"></label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Menu
