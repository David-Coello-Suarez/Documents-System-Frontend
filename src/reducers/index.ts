import { FonDocReducer } from "./fondoc"
import { LogginReducer } from "./loggin"
import { PerfilReducer } from "./perfil"
import { PermisReducer } from "./permis"
import { SeccioReducer } from "./seccio"
import { SeriesReducer } from "./series"
import { SeriexReducer } from "./seriex"
import { SidebaReducer } from "./sideba"
import { SubsecReducer } from "./subsec"
import { SubserReducer } from "./subser"
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
  series: SeriesReducer,
  subser: SubserReducer,
  seriex: SeriexReducer,
}
