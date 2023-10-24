import { lazy } from "react"
import { RouteObject } from "react-router-dom"
import FormProfile from "./profile/FormProfile"

const Layout = lazy(() => import("./Layout"))

const ProPerRouter: RouteObject[] = [
  { index: true, element: <Layout /> },
  { path: "addprofile", element: <FormProfile /> },
  { path: "editprofile/:id", element: <FormProfile /> },
]

export default ProPerRouter
