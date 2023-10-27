import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { iprofil } from "./../interfaces/iprofil"
import {
  getProfil,
  get_profil_manten,
  post_profile,
  put_profile,
} from "../controllers/profil"
import { irespuesta } from "../interfaces"

interface irespro extends irespuesta {
  data: {
    perfiles: iprofil[]
  }
}

const initialState = {
  perfil_loadin: false,
  perfil_perfil: Array<iprofil>(),
  perfil_active: 0,
  perfil_state: {
    profil_profil: 0,
    profil_nampro: "",
    profil_status: 1,
  },
}

const ProfilSlice = createSlice({
  name: "perfil",
  initialState,
  reducers: {
    clear_perfiles: (state) => {
      state.perfil_perfil = Array<iprofil>()
      state.perfil_active = 0
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
      .addCase(getProfil.pending, (_) => {
        toast.loading("Cargando listado de perfiles")
      })
      .addCase(
        getProfil.fulfilled,
        (state, { payload }: PayloadAction<irespro>) => {
          toast.dismiss()
          const { data, estado } = payload

          if (estado === 1) {
            state.perfil_perfil = data.perfiles
          }
        },
      )

    builder
      .addCase(get_profil_manten.pending, (state) => {
        state.perfil_loadin = true
      })
      .addCase(get_profil_manten.fulfilled, (state, { payload }) => {
        state.perfil_loadin = false
        const { data, estado } = payload

        if (estado == 1) {
          state.perfil_perfil = data.perfiles
        }
      })

    builder
      .addCase(post_profile.pending, (_) => {
        toast.loading("Creando perfil....")
      })
      .addCase(
        post_profile.fulfilled,
        (state, { payload }: PayloadAction<irespro>) => {
          toast.dismiss()
          const { data, mensaje, estado } = payload

          if (estado === 1) {
            toast.success(mensaje)
            state.perfil_perfil = data.perfiles
          } else {
            toast.info(mensaje)
          }
        },
      )

    builder
      .addCase(put_profile.pending, (_) => {
        toast.loading("Actualizando perfil....")
      })
      .addCase(put_profile.fulfilled, (state, { payload }) => {
        toast.dismiss()
        const { data, mensaje, estado } = payload

        if (estado === 1) {
          toast.success(mensaje)
          state.perfil_perfil = data.perfiles
        } else {
          toast.info(mensaje)
        }
      })
  },
})

export const PerfilReducer = ProfilSlice.reducer

export const { set_perfil, set_pefil_active, clear_perfiles } =
  ProfilSlice.actions
