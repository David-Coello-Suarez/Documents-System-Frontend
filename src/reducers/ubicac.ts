import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { iubicac } from "../interfaces"
import {
  delete_ubicac,
  get_ubicacs,
  get_ubicacs_active,
  post_ubicac,
  put_ubicac,
} from "../controllers/ubicac"

const initialState = {
  loadin_loadin: false,
  ubicacs_ubicacs: Array<iubicac>(),
  ubicac_pagina: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  ubicac_ubicac: {
    locali_locali: 0,
    locali_descri: "",

    sector_sector: 0,
    sector_nombre: "",

    subsct_subsct: 0,
    subsct_nombre: "",

    ubicac_ubicac: 0,
    ubicac_descri: "",
    ubicac_numdiv: 0,
    ubicac_status: 1,

    ubicac_usucre: "",
    ubicac_feccre: "",
    ubicac_usuact: "",
    ubicac_fecact: "",
  },
}

let toastId: Id

const UbicacSlice = createSlice({
  name: "ubicac",
  initialState,
  reducers: {
    clean_ubicacs: (state) => {
      state.ubicacs_ubicacs = initialState.ubicacs_ubicacs
      state.ubicac_pagina = initialState.ubicac_pagina
    },
    set_form_ubicac: (state, { payload }: PayloadAction<iubicac>) => {
      state.ubicac_ubicac = payload
    },
    clean_form_ubicac: (state) => {
      state.ubicac_ubicac = initialState.ubicac_ubicac
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_ubicacs.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_ubicacs.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.ubicacs_ubicacs = data.ubicacs
          state.ubicac_pagina = data.paginacion
        } else {
          state.ubicacs_ubicacs = initialState.ubicacs_ubicacs
          state.ubicac_pagina = initialState.ubicac_pagina
        }
      })

      .addCase(get_ubicacs_active.pending, (state) => {
        state.loadin_loadin = true
        toastId = toast.loading("Obteniendo Sub series .....")
      })
      .addCase(get_ubicacs_active.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.dismiss(toastId)
          state.ubicacs_ubicacs = data.ubicacs
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

      .addCase(post_ubicac.pending, () => {
        toastId = toast.loading("Creando Ubicación....")
      })
      .addCase(post_ubicac.fulfilled, (_, { payload }) => {
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

      .addCase(put_ubicac.pending, () => {
        toastId = toast.loading("Actualizando Ubicación....")
      })
      .addCase(put_ubicac.fulfilled, (_, { payload }) => {
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

      .addCase(delete_ubicac.pending, () => {
        toastId = toast.loading("Eliminando Ubicación....")
      })
      .addCase(delete_ubicac.fulfilled, (_, { payload }) => {
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

export const UbicacReducer = UbicacSlice.reducer

export const { clean_ubicacs, clean_form_ubicac, set_form_ubicac } =
  UbicacSlice.actions
