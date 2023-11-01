import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import {
  delete_fondoc,
  get_fondoc_active,
  get_fondocs,
  post_fondoc,
  put_fondoc,
} from "../controllers/fondoc"
import { ifondoc } from "../interfaces"

const initialState = {
  loadin_loadin: false,
  fondocs_fondocs: Array<ifondoc>(),
  fondoc_paginat: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  fondoc_state: {
    fondoc_fondoc: 0,
    fondoc_nombre: "",
    fondoc_descri: "",
    fondoc_status: 1,
  },
}

let toastId: Id

const FonDocSlice = createSlice({
  name: "fondoc",
  initialState,
  reducers: {
    set_fondoc: (state, { payload }: PayloadAction<ifondoc>) => {
      state.fondoc_state = payload
    },
    clean_fondoc_form: (state) => {
      state.fondoc_state = initialState.fondoc_state
    },
    clean_fondocs: (state) => {
      state.fondocs_fondocs = initialState.fondocs_fondocs
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_fondocs.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_fondocs.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.fondocs_fondocs = data.fondocs
          state.fondoc_paginat = data.paginacion
        } else {
          state.fondocs_fondocs = initialState.fondocs_fondocs
          state.fondoc_paginat = initialState.fondoc_paginat
        }
      })

      .addCase(get_fondoc_active.pending, () => {
        toastId = toast.loading(
          "Obteniendo Fondos Documentales Disponibles.....",
        )
      })
      .addCase(get_fondoc_active.fulfilled, (state, { payload }) => {
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          state.fondocs_fondocs = data.fondocs
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(post_fondoc.pending, () => {
        toastId = toast.loading("Creando Fondo Documental....")
      })
      .addCase(post_fondoc.fulfilled, (_, { payload }) => {
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

      .addCase(put_fondoc.pending, () => {
        toastId = toast.loading("Actualizando Fondo Documental....")
      })
      .addCase(put_fondoc.fulfilled, (_, { payload }) => {
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

      .addCase(delete_fondoc.pending, () => {
        toastId = toast.loading("Eliminando Fondo Documental....")
      })
      .addCase(delete_fondoc.fulfilled, (_, { payload }) => {
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
            "Se a producido un error. Ponte en contacto con el administrador 1",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      })
  },
})

export const FonDocReducer = FonDocSlice.reducer

export const { set_fondoc, clean_fondocs, clean_fondoc_form } =
  FonDocSlice.actions
