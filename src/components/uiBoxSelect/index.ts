import { lazy } from "react"

const FondocActive = lazy(() => import("./FonDocActive"))
const SeccioActive = lazy(() => import("./SeccioActive"))
const SubsecActive = lazy(() => import("./SubsecActive"))

export { FondocActive, SeccioActive, SubsecActive }
