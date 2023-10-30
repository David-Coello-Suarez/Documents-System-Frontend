import { createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import {
  get_modulo_perfil,
  get_permis_cabece,
  get_permis_modulo,
} from "../controllers/permis"
import { ipermod } from "../interfaces"

const initialState = {
  modulo_modulo: Array<ipermod>(),
  permis_cabece: Array<{ permis_permis: number; permis_nombre: string }>(),
  permis_modulo: Array<ipermod>(),
}

let countr_toastId: Id

const PermisSlice = createSlice({
  name: "permis",
  initialState,
  reducers: {
    clean_modulo: (state) => {
      state.modulo_modulo = initialState.modulo_modulo
    },
    clean_permiso_modulo: (state) => {
      state.permis_modulo = initialState.permis_modulo
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_modulo_perfil.fulfilled, (state, { payload }) => {
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          state.modulo_modulo = data.sideba
        } else {
          toast.update(countr_toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 2000,
          })
        }
      })

      .addCase(get_permis_cabece.fulfilled, (state, { payload }) => {
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          state.permis_cabece = data.cabecera
        } else {
          toast.update(countr_toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 2000,
          })
        }
      })

      .addCase(get_permis_modulo.fulfilled, (state, { payload }) => {
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          state.permis_modulo = data.sideba
        } else {
          state.permis_modulo = initialState.permis_modulo
          toast.update(countr_toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 2000,
          })
        }
      })

      .addMatcher(isRejected, () => {
        toast.error(
          "Se a producido un error. Ponte en contacto con el administrador",
        )
      })
  },
})

export const PermisReducer = PermisSlice.reducer

export const { clean_modulo, clean_permiso_modulo } = PermisSlice.actions
