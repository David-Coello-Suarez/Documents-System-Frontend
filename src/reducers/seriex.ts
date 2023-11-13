import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { iseriex } from "../interfaces"
import {
  delete_seriex,
  get_seriexs,
  get_seriexs_active,
  post_seriex,
  put_seriex,
} from "../controllers/seriex"

const initialState = {
  loadin_loadin: false,
  seriexs_seriexs: Array<iseriex>(),
  seriex_paginat: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  sereix_seriex: {
    fondoc_fondoc: 0,
    fondoc_nombre: "",

    seccio_seccio: 0,
    seccio_nombre: "",

    subsec_subsec: 0,
    subsec_nombre: "",

    seriex_seriex: 0,
    seriex_nombre: "",
    seriex_abrevi: "",
    seriex_status: 1,
  },
}

let toastId: Id
const SeriexSlice = createSlice({
  name: "seriex",
  initialState,
  reducers: {
    clean_seriexs: (state) => {
      state.seriexs_seriexs = initialState.seriexs_seriexs
      state.seriex_paginat = initialState.seriex_paginat
    },
    set_form_seriex: (state, { payload }: PayloadAction<iseriex>) => {
      state.sereix_seriex = payload
    },
    clean_form_seriex: (state) => {
      state.sereix_seriex = initialState.sereix_seriex
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_seriexs.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_seriexs.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.seriexs_seriexs = data.seriexs
          state.seriex_paginat = data.paginacion
        } else {
          state.seriexs_seriexs = initialState.seriexs_seriexs
          state.seriex_paginat = initialState.seriex_paginat
        }
      })

      .addCase(get_seriexs_active.pending, () => {
        toastId = toast.loading("Obteniendo Series .....")
      })
      .addCase(get_seriexs_active.fulfilled, (state, { payload }) => {
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.dismiss(toastId)
          state.seriexs_seriexs = data.seriexs
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(post_seriex.pending, () => {
        toastId = toast.loading("Creando Serie....")
      })
      .addCase(post_seriex.fulfilled, (_, { payload }) => {
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

      .addCase(put_seriex.pending, () => {
        toastId = toast.loading("Actualizando Serie....")
      })
      .addCase(put_seriex.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(delete_seriex.pending, () => {
        toastId = toast.loading("Eliminando Serie....")
      })
      .addCase(delete_seriex.fulfilled, (_, { payload }) => {
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

      .addMatcher(isRejected, (state) => {
        state.loadin_loadin = false
        toast.update(toastId, {
          render:
            "Se a producido un error. Ponte en contacto con el administrador",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      })
  },
})

export const SeriexReducer = SeriexSlice.reducer

export const { clean_seriexs, clean_form_seriex, set_form_seriex } =
  SeriexSlice.actions
