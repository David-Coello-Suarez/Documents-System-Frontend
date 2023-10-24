import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { iprofil } from "./../interfaces/iprofil"
import { getProfil } from "../controllers/profil"
import { irespuesta } from "../interfaces"

interface irespro extends irespuesta {
  data: {
    perfiles: iprofil[]
  }
}

const initialState = {
  perfil_perfil: Array<iprofil>(),
  perfil_active: 0,
  perfil_state: {
    profil_profil: 0,
    profil_nampro: "",
    profil_abbrev: "",
    profil_status: 1,
  },
}

const ProfilSlice = createSlice({
  name: "perfil",
  initialState,
  reducers: {
    clear_perfiles: (state) => {
      state.perfil_perfil = Array<iprofil>()
    },
    set_pefil_active: (state, { payload }: PayloadAction<number>) => {
      state.perfil_active = payload
    },
    set_perfil: (state, { payload }: PayloadAction<iprofil>) => {
      state.perfil_state = payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfil.pending, (state) => state)
      .addCase(
        getProfil.fulfilled,
        (state, { payload }: PayloadAction<irespro>) => {
          const { data, estado } = payload

          if (estado === 1) {
            state.perfil_perfil = data.perfiles
          }
        },
      )
  },
})

export const PerfilReducer = ProfilSlice.reducer

export const { set_perfil, set_pefil_active, clear_perfiles } =
  ProfilSlice.actions
