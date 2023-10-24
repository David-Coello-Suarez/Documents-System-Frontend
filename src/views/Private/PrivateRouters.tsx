import { RouteObject } from "react-router-dom"
import FonDocRouter from "./documentaryBackground"
import ProPerRouter from "./profilesPermissions"

const PrivateRouter: RouteObject[] = [
  { path: "documentaryBackground", children: FonDocRouter },
  { path: "profilesPermissions", children: ProPerRouter },
]

export default PrivateRouter
