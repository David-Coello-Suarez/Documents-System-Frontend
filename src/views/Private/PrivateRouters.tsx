import { RouteObject } from "react-router-dom"
import FonDocRouter from "./documentaryBackground"
import ProPerRouter from "./permissions"
import UserRouter from "./user"

const PrivateRouter: RouteObject[] = [
  { path: "documentaryBackground", children: FonDocRouter },
  { path: "permissions", children: ProPerRouter },
  { path: "user", children: UserRouter },
]

export default PrivateRouter
