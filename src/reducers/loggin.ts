import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { post_loggin } from "../controllers/loggin"

const initialState = {
  consultando: false,
  forusu: { nombreusuario: "davidcoello", contrasena: "IDvECrRU57" },
  usuario_loggin: {
    usuario: {
      usuari_usuar: 0,
      usuari_nomape: "",
      usuari_perfil: "",
      usuari_correo: "",
    },
    token: "",
  },
}

const LogginSlice = createSlice({
  name: "loggin",
  initialState,
  reducers: {
    clean_usuari: (state) => {
      state.usuario_loggin = initialState.usuario_loggin
    },
  },
  extraReducers(builder) {
    builder
      .addCase(post_loggin.pending, (state) => {
        state.consultando = true
      })
      .addCase(post_loggin.fulfilled, (state, { payload }) => {
        state.consultando = false
        const { mensaje, data, estado } = payload

        if (estado === 1) {
          state.usuario_loggin = { ...data }
          localStorage.setItem("token", data.token)
        } else {
          toast.warning(mensaje)
        }
      })
  },
})

export const LogginReducer = LogginSlice.reducer

export const { clean_usuari } = LogginSlice.actions
