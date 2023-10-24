import { FonDocReducer } from "./fondoc"
import { PerfilReducer } from "./perfil"
import { SidebaReducer } from "./sideba"

export const reducer = {
  sideba: SidebaReducer,
  fondoc: FonDocReducer,
  perfil: PerfilReducer,
}
