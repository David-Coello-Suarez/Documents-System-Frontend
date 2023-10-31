import { RouteObject } from "react-router-dom"
import FonDocRouter from "./documentaryBackground"
import ProPerRouter from "./permissions"
import UserRouter from "./user"
import ProfilesRouter from "./profiles"
import SectionsRouter from "./sections"
import SubsecRouter from "./subsections"
import SerieRouter from "./series"

const PrivateRouter: RouteObject[] = [
  { index: true, element: <h1>Home</h1> },
  { path: "documentaryBackground", children: FonDocRouter },
  { path: "permissions", children: ProPerRouter },
  { path: "user", children: UserRouter },
  { path: "profiles", children: ProfilesRouter },
  { path: "sections", children: SectionsRouter },
  { path: "subsections", children: SubsecRouter },
  { path: "series", children: SerieRouter },
]

export default PrivateRouter
