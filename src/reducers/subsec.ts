import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { isubsec } from "../interfaces"
import {
  delete_subsec,
  get_subsec_active,
  get_subsecs,
  post_subsec,
  put_subsec,
} from "../controllers/subsec"

const initialState = {
  loadin_loadin: false,
  subsecs_subsecs: Array<isubsec>(),
  subsecc_paginat: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  subsec_subsec: {
    fondoc_fondoc: 0,
    fondoc_nombre: 0,

    seccio_seccio: 0,
    seccio_nombre: "",

    subsec_subsec: 0,
    subsec_nombre: "",
    subsec_status: 1,
  },
}

let toastId: Id

const SubsecSlice = createSlice({
  name: "subsec",
  initialState,
  reducers: {
    clean_subsecs: (state) => {
      state.subsecs_subsecs = initialState.subsecs_subsecs
    },
    set_form_subsec: (state, { payload }: PayloadAction<isubsec>) => {
      state.subsec_subsec = payload
    },
    clean_form_subsec: (state) => {
      state.subsec_subsec = initialState.subsec_subsec
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_subsecs.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_subsecs.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.subsecs_subsecs = data.subseccs
          state.subsecc_paginat = data.paginacion
        } else {
          state.subsecs_subsecs = initialState.subsecs_subsecs
          state.subsecc_paginat = initialState.subsecc_paginat
        }
      })

      .addCase(get_subsec_active.pending, () => {
        toastId = toast.loading("Obteniendo Sub Secciones .....")
      })
      .addCase(get_subsec_active.fulfilled, (state, { payload }) => {
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.dismiss(toastId)
          state.subsecs_subsecs = data.subseccs
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(post_subsec.pending, () => {
        toastId = toast.loading("Creando Sub Sección....")
      })
      .addCase(post_subsec.fulfilled, (_, { payload }) => {
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

      .addCase(put_subsec.pending, () => {
        toastId = toast.loading("Actualizando Sub Sección....")
      })
      .addCase(put_subsec.fulfilled, (_, { payload }) => {
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

      .addCase(delete_subsec.pending, () => {
        toastId = toast.loading("Eliminando Sub Sección....")
      })
      .addCase(delete_subsec.fulfilled, (_, { payload }) => {
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

export const SubsecReducer = SubsecSlice.reducer

export const { clean_subsecs, clean_form_subsec, set_form_subsec } =
  SubsecSlice.actions
