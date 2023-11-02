import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { isubser } from "../interfaces"
import {
  delete_subser,
  get_subsers,
  get_subsers_active,
  post_subser,
  put_subser,
} from "../controllers/subser"

const initialState = {
  loadin_loadin: false,
  subsers_subsers: Array<isubser>(),
  subser_pagina: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  subser_subser: {
    fondoc_fondoc: 0,
    fondoc_nombre: "",

    seccio_seccio: 0,
    seccio_nombre: "",

    subsec_subsec: 0,
    subsec_nombre: "",

    seriex_seriex: 0,
    seriex_nombre: "",

    subser_subser: 0,
    subser_nombre: "",
    subser_status: 1,
  },
}

let toastId: Id

const SubserSlice = createSlice({
  name: "subser",
  initialState,
  reducers: {
    clean_subsers: (state) => {
      state.subsers_subsers = initialState.subsers_subsers
      state.subser_pagina = initialState.subser_pagina
    },
    set_form_subser: (state, { payload }: PayloadAction<isubser>) => {
      state.subser_subser = payload
    },
    clean_form_subser: (state) => {
      state.subser_subser = initialState.subser_subser
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_subsers.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_subsers.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.subsers_subsers = data.subsers
          state.subser_pagina = data.paginacion
        } else {
          state.subsers_subsers = initialState.subsers_subsers
          state.subser_pagina = initialState.subser_pagina
        }
      })

      .addCase(get_subsers_active.pending, (state) => {
        state.loadin_loadin = true
        toastId = toast.loading("Obteniendo Sub series .....")
      })
      .addCase(get_subsers_active.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.dismiss(toastId)
          state.subsers_subsers = data.subsers
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(post_subser.pending, () => {
        toastId = toast.loading("Creando Sub Serie....")
      })
      .addCase(post_subser.fulfilled, (_, { payload }) => {
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

      .addCase(put_subser.pending, () => {
        toastId = toast.loading("Actualizando Sub Serie....")
      })
      .addCase(put_subser.fulfilled, (_, { payload }) => {
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

      .addCase(delete_subser.pending, () => {
        toastId = toast.loading("Eliminando Sub serie....")
      })
      .addCase(delete_subser.fulfilled, (_, { payload }) => {
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

      .addMatcher(isRejected, () => {

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

export const SubserReducer = SubserSlice.reducer

export const { clean_subsers, clean_form_subser, set_form_subser } =
  SubserSlice.actions
