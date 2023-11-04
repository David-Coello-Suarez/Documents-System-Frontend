import { lazy } from "react"

const FondocActive = lazy(() => import("./FonDocActive"))
const SeccioActive = lazy(() => import("./SeccioActive"))
const SubsecActive = lazy(() => import("./SubsecActive"))
const SeriexActive = lazy(() => import("./SeriexActive"))
const SubserActive = lazy(() => import("./SubserActive"))

const LocaliActive = lazy(() => import("./LocaliActive"))
const SectorActive = lazy(() => import("./SectorActive"))
const SubsctActive = lazy(() => import("./SubsctActive"))
const UbicacActive = lazy(() => import("./UbicacActive"))

const TipdocActive = lazy(() => import("./TipdocActive"))

export {
  // CLASIFICACION DOC.
  FondocActive,
  SeccioActive,
  SubsecActive,
  SeriexActive,
  SubserActive,

  // UBICACION FISICA
  LocaliActive,
  SectorActive,
  SubsctActive,
  UbicacActive,
  TipdocActive,
}
