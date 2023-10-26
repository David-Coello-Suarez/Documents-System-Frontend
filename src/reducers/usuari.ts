import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SaveUsuari, UpdateUsuari, listar_usuario } from "@/controllers/usuari"
import { toast } from "react-toastify"
import { irespuesta, iusuari } from "../interfaces"

interface iresusu extends irespuesta {
  data: {
    usuario: string
    contrasena: string
    usuarios: iusuari[]
  }
}

const initialState = {
  usuari_loadin: false,
  usuari_usuari: Array<iusuari>(),
  usuari_form: {
    usuari_usuari: 0,
    usuari_nomusu: "",
    usuari_nomape: "",
    usuari_codest: 1,
    usuari_tipaut: "",
    usuari_correo: "",
    usuari_direcc: "",
    usuari_idperf: 0,
    usuari_perfil: "",
    usuari_estado: 1,
    usuari_idtiau: 0,
  },
}

const UsuariSlice = createSlice({
  name: "usuari",
  initialState,
  reducers: {
    set_usuari: (state, { payload }) => {
      state.usuari_form = { ...payload }
    },
    clean_form: (state) => {
      state.usuari_form = initialState.usuari_form
    },
    clean_array_usuari: (state) => {
      state.usuari_usuari = initialState.usuari_usuari
    },
  },
  extraReducers(builder) {
    builder
      .addCase(listar_usuario.pending, (state) => {
        state.usuari_loadin = true
      })
      .addCase(listar_usuario.fulfilled, (state, { payload }) => {
        const { estado, data } = payload
        state.usuari_loadin = false

        if (estado === 1) {
          state.usuari_usuari = data.usuarios
        }
      })

    builder
      .addCase(SaveUsuari.pending, (state) => {
        state.usuari_loadin = true
      })
      .addCase(SaveUsuari.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado == 1) {
          toast.success(mensaje)
        } else {
          toast.info(mensaje)
        }
      })

    builder
      .addCase(UpdateUsuari.pending, (state) => {
        state.usuari_loadin = false
      })
      .addCase(UpdateUsuari.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.success(mensaje)
        } else {
          toast.info(mensaje)
        }
      })
  },
})

export const UsuariReducer = UsuariSlice.reducer

export const { set_usuari, clean_form, clean_array_usuari } =
  UsuariSlice.actions
