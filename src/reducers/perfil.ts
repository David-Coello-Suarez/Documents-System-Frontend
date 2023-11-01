import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { iprofil } from "./../interfaces/iprofil"
import {
  delete_perfil,
  get_perfils,
  get_profils_active,
  post_prefil,
  put_perfil,
} from "../controllers/profil"

const initialState = {
  loading_loading: false,
  perfils_perfils: Array<iprofil>(),
  perfils_paginat: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  perfil_active: 0,
  perfil_state: {
    profil_profil: 0,
    profil_nampro: "",
    profil_abbrev: "",
    profil_status: "1",
  },
}

let toastId: Id

const ProfilSlice = createSlice({
  name: "perfil",
  initialState,
  reducers: {
    clean_perfil_active: (state) => {
      state.perfil_active = 0
    },
    clean_perfiles: (state) => {
      state.perfils_perfils = Array<iprofil>()
    },
    clean_form_perfil: (state) => {
      state.perfil_state = initialState.perfil_state
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
      .addCase(get_perfils.pending, (state) => {
        state.loading_loading = true
      })
      .addCase(get_perfils.fulfilled, (state, { payload }) => {
        state.loading_loading = false

        const { estado, data } = payload

        if (estado === 1) {
          state.perfils_perfils = data.perfiles
          state.perfils_paginat = data.paginacion
        } else {
          state.perfils_perfils = initialState.perfils_perfils
          state.perfils_paginat = initialState.perfils_paginat
        }
      })

    builder
      .addCase(get_profils_active.pending, (state) => {
        state.loading_loading = true
      })
      .addCase(get_profils_active.fulfilled, (state, { payload }) => {
        state.loading_loading = false

        const { estado, data } = payload

        if (estado === 1) {
          state.perfils_perfils = data.perfiles
        }
      })

    builder
      .addCase(post_prefil.pending, () => {
        toastId = toast.loading("Creando perfil....")
      })
      .addCase(post_prefil.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

    builder
      .addCase(put_perfil.pending, () => {
        toastId = toast.loading("Actualizando perfil....")
      })
      .addCase(put_perfil.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

    builder
      .addCase(delete_perfil.pending, () => {
        toastId = toast.loading("Eliminando perfil....")
      })
      .addCase(delete_perfil.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })
  },
})

export const PerfilReducer = ProfilSlice.reducer

export const {
  set_perfil,
  set_pefil_active,
  clean_perfiles,
  clean_form_perfil,
  clean_perfil_active,
} = ProfilSlice.actions
