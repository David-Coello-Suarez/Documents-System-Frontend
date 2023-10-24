import { FonDocReducer } from "./fondoc"
import { PerfilReducer } from "./perfil"
import { SidebarReducer } from "./sideba"

export const reducer = {
  sideba: SidebarReducer,
  fondoc: FonDocReducer,
  perfil: PerfilReducer,
}
