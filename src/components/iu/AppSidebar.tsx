import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"

const AppSidebar = () => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <SimpleBar className="sidebar-menu">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title py-2">Principal</li>
            </ul>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default AppSidebar
