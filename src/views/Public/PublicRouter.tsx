import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const Loggin = lazy(() => import("./Loggin"))

const PublicRouter: RouteObject[] = [{ index: true, element: <Loggin /> }]

export default PublicRouter
