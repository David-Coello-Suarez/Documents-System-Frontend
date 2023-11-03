import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { ilocali } from "../interfaces"
import {
  delete_locali,
  get_localis,
  get_localis_active,
  post_locali,
  put_locali,
} from "../controllers/locali"

const initialState = {
  loadin_loadin: false,
  localis_localis: Array<ilocali>(),
  locali_pagina: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  locali_locali: {
    locali_locali: 0,
    locali_descri: "",
    locali_status: 1,

    locali_usucre: "",
    locali_feccre: "",
    locali_usuact: "",
    locali_fecact: "",
  },
}

let toastId: Id

const LocaliSlice = createSlice({
  name: "locali",
  initialState,
  reducers: {
    clean_localis: (state) => {
      state.localis_localis = initialState.localis_localis
      state.locali_pagina = initialState.locali_pagina
    },
    set_form_locali: (state, { payload }: PayloadAction<ilocali>) => {
      state.locali_locali = payload
    },
    clean_form_locali: (state) => {
      state.locali_locali = initialState.locali_locali
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_localis.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_localis.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.localis_localis = data.localis
          state.locali_pagina = data.paginacion
        } else {
          state.localis_localis = initialState.localis_localis
          state.locali_pagina = initialState.locali_pagina
        }
      })

      .addCase(get_localis_active.pending, (state) => {
        state.loadin_loadin = true
        toastId = toast.loading("Obteniendo Sub series .....")
      })
      .addCase(get_localis_active.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.dismiss(toastId)
          state.localis_localis = data.localis
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

      .addCase(post_locali.pending, () => {
        toastId = toast.loading("Creando Localidad....")
      })
      .addCase(post_locali.fulfilled, (_, { payload }) => {
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

      .addCase(put_locali.pending, () => {
        toastId = toast.loading("Actualizando Localidad....")
      })
      .addCase(put_locali.fulfilled, (_, { payload }) => {
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

      .addCase(delete_locali.pending, () => {
        toastId = toast.loading("Eliminando Localidad....")
      })
      .addCase(delete_locali.fulfilled, (_, { payload }) => {
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

export const LocaliReducer = LocaliSlice.reducer

export const { clean_localis, clean_form_locali, set_form_locali } =
  LocaliSlice.actions
