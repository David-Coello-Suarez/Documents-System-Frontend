import { lazy } from "react"

const FondocActive = lazy(() => import("./FonDocActive"))
const SeccioActive = lazy(() => import("./SeccioActive"))
const SubsecActive = lazy(() => import("./SubsecActive"))
const SeriexActive = lazy(() => import("./SeriexActive"))

export { FondocActive, SeccioActive, SubsecActive, SeriexActive }
