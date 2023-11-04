import { FonDocReducer } from "./fondoc"
import { LocaliReducer } from "./locali"
import { LogginReducer } from "./loggin"
import { PerfilReducer } from "./perfil"
import { PermisReducer } from "./permis"
import { SeccioReducer } from "./seccio"
import { SectorReducer } from "./sector"
import { SeriexReducer } from "./seriex"
import { SidebaReducer } from "./sideba"
import { SubsctReducer } from "./subsct"
import { SubsecReducer } from "./subsec"
import { SubserReducer } from "./subser"
import { TipdocReducer } from "./tipdoc"
import { UbicacReducer } from "./ubicac"
import { UsuariReducer } from "./usuari"

export const reducer = {
  sideba: SidebaReducer,
  fondoc: FonDocReducer,
  perfil: PerfilReducer,
  usuari: UsuariReducer,
  permis: PermisReducer,
  loggin: LogginReducer,
  seccio: SeccioReducer,
  subsec: SubsecReducer,
  seriex: SeriexReducer,
  subser: SubserReducer,
  locali: LocaliReducer,
  sector: SectorReducer,
  subsct: SubsctReducer,
  ubicac: UbicacReducer,
  tipdoc: TipdocReducer,
}
