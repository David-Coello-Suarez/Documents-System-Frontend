import { FonDocReducer } from "./fondoc"
import { LogginReducer } from "./loggin"
import { PerfilReducer } from "./perfil"
import { PermisReducer } from "./permis"
import { SectioReducer } from "./sectio"
import { SeriesReducer } from "./series"
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
  sectio: SectioReducer,
  subsec: SubsecReducer,
  series: SeriesReducer,
  subser: SubserReducer,
}
