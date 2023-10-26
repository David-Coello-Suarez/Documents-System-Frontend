import { FonDocReducer } from "./fondoc"
import { PerfilReducer } from "./perfil"
import { PermisReducer } from "./permis"
import { SidebaReducer } from "./sideba"
import { UsuariReducer } from "./usuari"

export const reducer = {
  sideba: SidebaReducer,
  fondoc: FonDocReducer,
  perfil: PerfilReducer,
  usuari: UsuariReducer,
  permis: PermisReducer,
}
