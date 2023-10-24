import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const Layout = lazy(() => import("./Layout"))
const FonDoc = lazy(() => import("./FonDoc"))

const FonDocRouter: RouteObject[] = [
  { index: true, element: <Layout /> },
  { path: "add", element: <FonDoc /> },
  { path: "edit/:id", element: <FonDoc /> },
]

export default FonDocRouter
