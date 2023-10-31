import { FonDocReducer } from "./fondoc"
import { LogginReducer } from "./loggin"
import { PerfilReducer } from "./perfil"
import { PermisReducer } from "./permis"
import { SectioReducer } from "./sectio"
import { SidebaReducer } from "./sideba"
import { UsuariReducer } from "./usuari"

export const reducer = {
  sideba: SidebaReducer,
  fondoc: FonDocReducer,
  perfil: PerfilReducer,
  usuari: UsuariReducer,
  permis: PermisReducer,
  loggin: LogginReducer,
  sectio: SectioReducer,
}
