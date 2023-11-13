import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { itipdoc } from "../interfaces"
import {
  delete_tipdoc,
  get_tipdocs,
  get_tipdocs_active,
  post_tipdoc,
  put_tipdoc,
} from "../controllers/tipdoc"

const initialState = {
  loadin_loadin: false,
  tipdocs_tipdocs: Array<itipdoc>(),
  tipdoc_pagina: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  tipdoc_tipdoc: {
    tipdoc_tipdoc: 0,
    tipdoc_descri: "",
    tipdoc_numcon: 0,
    tipdoc_status: 1,

    tipdoc_usucre: "",
    tipdoc_feccre: "",
    tipdoc_usuact: "",
    tipdoc_fecact: "",
  },
}

let toastId: Id

const TipdocSlice = createSlice({
  name: "ubicac",
  initialState,
  reducers: {
    clean_tipdocs: (state) => {
      state.tipdocs_tipdocs = initialState.tipdocs_tipdocs
      state.tipdoc_pagina = initialState.tipdoc_pagina
    },
    set_form_tipdoc: (state, { payload }: PayloadAction<itipdoc>) => {
      state.tipdoc_tipdoc = payload
    },
    clean_form_tipdoc: (state) => {
      state.tipdoc_tipdoc = initialState.tipdoc_tipdoc
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_tipdocs.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_tipdocs.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.tipdocs_tipdocs = data.tipdocs
          state.tipdoc_pagina = data.paginacion
        } else {
          state.tipdocs_tipdocs = initialState.tipdocs_tipdocs
          state.tipdoc_pagina = initialState.tipdoc_pagina
        }
      })

      .addCase(get_tipdocs_active.pending, (state) => {
        state.loadin_loadin = true
        toastId = toast.loading("Obteniendo Sub series .....")
      })
      .addCase(get_tipdocs_active.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.dismiss(toastId)
          state.tipdocs_tipdocs = data.tipdocs
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

      .addCase(post_tipdoc.pending, () => {
        toastId = toast.loading("Creando Tipo Documental....")
      })
      .addCase(post_tipdoc.fulfilled, (_, { payload }) => {
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

      .addCase(put_tipdoc.pending, () => {
        toastId = toast.loading("Actualizando Tipo Documental....")
      })
      .addCase(put_tipdoc.fulfilled, (_, { payload }) => {
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

      .addCase(delete_tipdoc.pending, () => {
        toastId = toast.loading("Eliminando Tipo Documental....")
      })
      .addCase(delete_tipdoc.fulfilled, (_, { payload }) => {
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
        } else {
          toast.dismiss(toastId)
        }
      })
  },
})

export const TipdocReducer = TipdocSlice.reducer

export const { clean_tipdocs, clean_form_tipdoc, set_form_tipdoc } =
  TipdocSlice.actions
