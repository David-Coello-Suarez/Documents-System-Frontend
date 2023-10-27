import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const Profiles = lazy(() => import("./Layout"))
const Form = lazy(() => import("./Form"))

const ProfilesRouter: RouteObject[] = [
  { index: true, element: <Profiles /> },
  { path: "add", element: <Form /> },
  { path: "edit/:id", element: <Form /> },
]

export default ProfilesRouter
