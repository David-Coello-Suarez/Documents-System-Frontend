import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const User = lazy(() => import("./Layout"))
const Form = lazy(() => import("./Form"))

const UserRouter: RouteObject[] = [
  // { index: true, element: <User /> },
  { index: true, element: <Form /> },
]

export default UserRouter
