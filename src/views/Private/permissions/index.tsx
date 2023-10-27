import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const Layout = lazy(() => import("./Layout"))

const ProPerRouter: RouteObject[] = [{ index: true, element: <Layout /> }]

export default ProPerRouter
