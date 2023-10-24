import { RouteObject } from "react-router-dom"
import FonDocRouter from "./documentaryBackground"

const PrivateRouter: RouteObject[] = [
  { path: "documentaryBackground", children: FonDocRouter },
]

export default PrivateRouter
