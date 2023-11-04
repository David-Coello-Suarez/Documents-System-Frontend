import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const Layout = lazy(() => import("./Layout"))
const Form = lazy(() => import("./Form"))

const TipdocRouter: RouteObject[] = [
  { index: true, element: <Layout /> },
  { path: "add", element: <Form /> },
  { path: "edit/:id", element: <Form /> },
]

export default TipdocRouter
