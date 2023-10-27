import { lazy } from "react"

const Private = lazy(() => import("./Private"))
const Public = lazy(() => import("./Public"))

export { Private, Public }
