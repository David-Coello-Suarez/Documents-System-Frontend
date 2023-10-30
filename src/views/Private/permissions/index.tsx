import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const Layout = lazy(() => import("./Layout"))

const ProfilesRouter: RouteObject[] = [{ index: true, element: <Layout /> }]

export default ProfilesRouter
