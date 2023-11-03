import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { isubsct } from "../interfaces"
import {
  delete_subsct,
  get_subscts,
  get_subscts_active,
  post_subsct,
  put_subsct,
} from "../controllers/subsct"

const initialState = {
  loadin_loadin: false,
  subscts_subscts: Array<isubsct>(),
  subsct_pagina: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  subsct_subsct: {
    locali_locali: 0,
    locali_descri: "",

    sector_sector: 0,
    sector_nombre: "",

    subsct_subsct: 0,
    subsct_nombre: "",
    subsct_status: 1,

    subsct_usucre: "",
    subsct_feccre: "",
    subsct_usuact: "",
    subsct_fecact: "",
  },
}

let toastId: Id

const SubsctSlice = createSlice({
  name: "subsct",
  initialState,
  reducers: {
    clean_subscts: (state) => {
      state.subscts_subscts = initialState.subscts_subscts
      state.subsct_pagina = initialState.subsct_pagina
    },
    set_form_subsct: (state, { payload }: PayloadAction<isubsct>) => {
      state.subsct_subsct = payload
    },
    clean_form_subsct: (state) => {
      state.subsct_subsct = initialState.subsct_subsct
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_subscts.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_subscts.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.subscts_subscts = data.subscts
          state.subsct_pagina = data.paginacion
        } else {
          state.subscts_subscts = initialState.subscts_subscts
          state.subsct_pagina = initialState.subsct_pagina
        }
      })

      .addCase(get_subscts_active.pending, (state) => {
        state.loadin_loadin = true
        toastId = toast.loading("Obteniendo Sub series .....")
      })
      .addCase(get_subscts_active.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.dismiss(toastId)
          state.subscts_subscts = data.subscts
        } else {
          toast.update(toastId, {
            theme: "colored",
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(post_subsct.pending, () => {
        toastId = toast.loading("Creando Sub Sector....")
      })
      .addCase(post_subsct.fulfilled, (_, { payload }) => {
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

      .addCase(put_subsct.pending, () => {
        toastId = toast.loading("Actualizando Sub Sector....")
      })
      .addCase(put_subsct.fulfilled, (_, { payload }) => {
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

      .addCase(delete_subsct.pending, () => {
        toastId = toast.loading("Eliminando Sub Sector....")
      })
      .addCase(delete_subsct.fulfilled, (_, { payload }) => {
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

        if (!toast.isActive(toastId)) {
          toast.update(toastId, {
            render:
              "Se a producido un error. Ponte en contacto con el administrador1",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })
  },
})

export const SubsctReducer = SubsctSlice.reducer

export const { clean_subscts, clean_form_subsct, set_form_subsct } =
  SubsctSlice.actions
