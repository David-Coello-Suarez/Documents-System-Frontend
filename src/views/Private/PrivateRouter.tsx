import { RouteObject } from "react-router-dom"
import FonDocRouter from "./documentaryBackground"
import ProPerRouter from "./permissions"
import UserRouter from "./user"
import ProfilesRouter from "./profiles"
import SectionsRouter from "./sections"
import SubsecRouter from "./subsections"
import SeriexRouter from "./seriex"
import SubserRouter from "./subseriex"
import LocaliRouter from "./physicalLocation"
import SectorReducer from "./sector"
import SubsctRouter from "./subsector"

const PrivateRouter: RouteObject[] = [
  { index: true, element: <h1>Home</h1> },
  { path: "documentaryBackground", children: FonDocRouter },
  { path: "permissions", children: ProPerRouter },
  { path: "user", children: UserRouter },
  { path: "profiles", children: ProfilesRouter },
  { path: "sections", children: SectionsRouter },
  { path: "subsections", children: SubsecRouter },
  { path: "seriex", children: SeriexRouter },
  { path: "subseriex", children: SubserRouter },
  { path: "physicalLocation", children: LocaliRouter },
  { path: "sector", children: SectorReducer },
  { path: "subsector", children: SubsctRouter },
]

export default PrivateRouter
