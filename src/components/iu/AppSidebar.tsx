import { memo, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"
import { isideba } from "../../interfaces"
import { getSideba } from "../../controllers/sidebar"
import { clean_sidebar } from "../../reducers/sideba"

const AppSidebar = () => {
  const dispatch = useAppDispatch()

  const { sideba_sideba } = useAppSelector((state) => state.sideba)

  const path = useLocation().pathname

  useEffect(() => {
    dispatch(getSideba())

    return () => {
      dispatch(clean_sidebar())
    }
  }, [])

  return (
    <div className="sidebar" id="sidebar">
      <SimpleBar
        className="sidebar-menu"
        style={{ maxHeight: "100%", width: "100%" }}
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">Principal</li>
              <li
                className={`${path === "/" || path == "/dash" ? "active" : ""}`}
              >
                <Link to={"."}>
                  <i className="fa fa-dashboard" />
                  <span>Dashboard</span>
                </Link>
              </li>
              {sideba_sideba.map((sd) =>
                sd.sideba_submen.length === 0 ? (
                  <LinkPage key={sd.sideba_sideba} props={sd} />
                ) : (
                  <DropDownMenu props={sd} key={sd.sideba_sideba} />
                ),
              )}
            </ul>
          </div>
        </div>
      </SimpleBar>
    </div>
  )
}

export default memo(AppSidebar)

interface idropdown {
  props: isideba
}

const DropDownMenu = ({ props }: idropdown) => {
  const [isSubmenuOpen, setSubmenuOpen] = useState(false)

  if (props.sideba_submen.length == 0) return <LinkPage props={props} />

  const handleClickMenu = (e: React.MouseEvent) => {
    if (props.sideba_submen.length > 0) {
      e.preventDefault()
      setSubmenuOpen(!isSubmenuOpen)
    }
  }

  return (
    <>
      <li className={`submenu ${isSubmenuOpen ? "open" : ""}`}>
        <a onClick={handleClickMenu} className={isSubmenuOpen ? "subdrop" : ""}>
          {props.sideba_sidico && <i className={props.sideba_sidico} />}
          <span>{props.sideba_nombre}</span>
          {props.sideba_submen.length > 0 && <span className="menu-arrow" />}
        </a>

        <ul style={{ display: isSubmenuOpen ? "block" : "none" }}>
          {isSubmenuOpen &&
            props.sideba_submen.length > 0 &&
            props.sideba_submen.map((sdi) => (
              <DropDownMenu props={sdi} key={sdi.sideba_sideba} />
            ))}
        </ul>
      </li>
    </>
  )
}

interface ilinkpage {
  props: isideba
}

const LinkPage = ({ props }: ilinkpage) => (
  <li>
    <Link to={props.sideba_ventan}>
      {props.sideba_sidico && <i className={props.sideba_sidico} />}
      <span>{props.sideba_nombre}</span>
    </Link>
  </li>
)
