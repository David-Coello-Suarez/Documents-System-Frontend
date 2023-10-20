import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import SimpleBar from "simplebar-react"
import { useAppSelector } from "../../hooks"
import "simplebar-react/dist/simplebar.min.css"
import { isideba } from "../../interfaces"

const AppSidebar = () => {
  const { sideba_sideba } = useAppSelector((state) => state.sideba)

  const path = useLocation().pathname

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <SimpleBar className="sidebar-menu">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title py-2">Principal</li>
              <li
                className={`${path === "/" || path == "/dash" ? "active" : ""}`}
              >
                <Link to={"."} className="py-2  px-2">
                  <span
                    className="material-symbols-outlined"
                    style={{ lineHeight: "1", marginLeft: 0 }}
                  >
                    home
                  </span>
                  <span className="align-self-end">Dashboard</span>
                </Link>
              </li>
              {sideba_sideba.map((sd) =>
                sd.sideba_submen.length === 0 ? (
                  <Pagina key={sd.sideba_sideba} propsp={sd} />
                ) : (
                  <Submenu key={sd.sideba_sideba} props={sd} />
                ),
              )}
            </ul>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default AppSidebar

interface isubmenu {
  props: isideba
  submenu?: boolean
}

const Submenu = ({ props, submenu }: isubmenu) => {
  const [open, setOpen] = useState(false)

  if (props.sideba_submen.length == 0)
    return <Pagina propsp={props} addClass submenu />

  const handleCollapse = () => setOpen(!open)

  return (
    <li className="submenu">
      <a
        onClick={handleCollapse}
        className={`d-inline-flex justify-content-between m-0 py-2 w-100 ${
          submenu ? (props.sideba_submen.length > 0 ? "ps-4" : "ps-5") : "px-2"
        }`}
      >
        <div>
          <i className="material-symbols-outlined">{props.sideba_sidico}</i>{" "}
          <span className="ms-0"> {props.sideba_nombre} </span>
        </div>
        <span
          className="material-symbols-outlined ms-1"
          style={{ lineHeight: "1", marginRight: 0 }}
        >
          {!open ? "expand_more" : "expand_less"}
        </span>
      </a>
      <ul className={` ${open ? "d-block" : "d-none"} `}>
        {props.sideba_submen.length > 0 &&
          props.sideba_submen.map((sdi) => (
            <Submenu key={sdi.sideba_sideba} props={sdi} submenu />
          ))}
      </ul>
    </li>
  )
}

interface ipagina {
  propsp: isideba
  addClass?: boolean
  submenu?: boolean
}

const Pagina = ({ propsp, addClass, submenu }: ipagina) => {
  const path = useLocation().pathname

  const pathString = path.split("/").filter(Boolean)

  return (
    <li
      style={{ cursor: "pointer" }}
      className={`${pathString[1] === propsp.sideba_ventan ? "active" : ""}`}
    >
      <Link
        to={propsp.sideba_ventan}
        className={`${
          addClass ? "align-items-center d-inline-flex w-100" : ""
        } ${submenu ? "ps-5" : "px-2 py-2"}`}
      >
        <span
          className="material-symbols-outlined"
          style={{ lineHeight: "1", marginLeft: 0 }}
        >
          {propsp.sideba_sidico}
        </span>
        <span className={`${addClass ? "ms-2" : ""}`}>
          {propsp.sideba_nombre}
        </span>
      </Link>
    </li>
  )
}
