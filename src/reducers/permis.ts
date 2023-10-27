import { createSlice } from "@reduxjs/toolkit"
import {
  get_cabecera_permisos,
  get_modulo,
  get_permiso_modulo,
} from "@/controllers/permis"
import { iperall } from "../interfaces"

const initialState = {
  permis_perall: Array<iperall>(),
  permis_permod: Array<iperall>(),
  permis_cabece: Array<{ permis_permis: number; permis_nombre: string }>(),
}

const PermisSlice = createSlice({
  name: "permis",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(get_modulo.fulfilled, (state, { payload }) => {
      const { estado, data } = payload

      if (estado === 1) {
        state.permis_perall = data.sideba
      } 
    })

    builder.addCase(get_permiso_modulo.fulfilled, (state, { payload }) => {
      const { estado,  data } = payload

      if (estado === 1) {
        state.permis_permod = data.sideba
      } else {
        state.permis_permod = initialState.permis_permod
       
      }
    })

    builder.addCase(get_cabecera_permisos.fulfilled, (state, { payload }) => {
      const { estado,  data } = payload

      if (estado === 1) {
        state.permis_cabece = data.cabecera
      } 
    })
  },
})

export const PermisReducer = PermisSlice.reducer
