import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { iseccio } from "../interfaces"
import {
  delete_seccio,
  get_seccio_active,
  get_seccios,
  post_seccio,
  put_seccio,
} from "../controllers/seccio"

const initialState = {
  loadin_loadin: false,
  seccios_seccios: Array<iseccio>(),
  seccio_paginat: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  seccio_seccio: {
    fondoc_fondoc: 0,
    fondoc_nombre: "",

    seccio_seccio: 0,
    seccio_nombre: "",
    seccio_abrevi: "",
    seccio_status: 1,
  },
}

let toastId: Id

const SeccioSlice = createSlice({
  name: "sectio",
  initialState,
  reducers: {
    clean_seccios: (state) => {
      state.seccios_seccios = initialState.seccios_seccios
    },
    set_form_seccio: (state, { payload }: PayloadAction<iseccio>) => {
      state.seccio_seccio = payload
    },
    clean_form_seccio: (state) => {
      state.seccio_seccio = initialState.seccio_seccio
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_seccios.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_seccios.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.seccios_seccios = data.seccios
          state.seccio_paginat = data.paginacion
        } else {
          state.seccios_seccios = initialState.seccios_seccios
          state.seccio_paginat = initialState.seccio_paginat
        }
      })

      .addCase(get_seccio_active.pending, () => {
        toastId = toast.loading("Obteniendo Secciones Disponibles.....")
      })
      .addCase(get_seccio_active.fulfilled, (state, { payload }) => {
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.dismiss(toastId)
          state.seccios_seccios = data.seccios
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(post_seccio.pending, () => {
        toastId = toast.loading("Creando Sección....")
      })
      .addCase(post_seccio.fulfilled, (_, { payload }) => {
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

      .addCase(put_seccio.pending, () => {
        toastId = toast.loading("Actualizando Sección....")
      })
      .addCase(put_seccio.fulfilled, (_, { payload }) => {
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

      .addCase(delete_seccio.pending, () => {
        toastId = toast.loading("Eliminando Sección....")
      })
      .addCase(delete_seccio.fulfilled, (_, { payload }) => {
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

export const SeccioReducer = SeccioSlice.reducer

export const { clean_seccios, set_form_seccio, clean_form_seccio } =
  SeccioSlice.actions
