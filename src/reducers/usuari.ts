import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { iusuari } from "../interfaces"
import {
  delete_usuari,
  get_usuaris,
  post_usuari,
  put_usuari,
} from "../controllers/usuari"

const initialState = {
  usuari_loadin: false,
  usuari_usuari: Array<iusuari>(),
  usuari_paginat: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  usuari_creado: { usuario: "", contrasena: "" },
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
    usuari_idtiau: "0",
  },
  usuari_opemod: {
    isOpen: false,
  },
}

let toastId: Id

const UsuariSlice = createSlice({
  name: "usuari",
  initialState,
  reducers: {
    close_modal: (state) => {
      state.usuari_opemod.isOpen = false
      state.usuari_creado = initialState.usuari_creado
    },
    set_usuari: (state, { payload }: PayloadAction<iusuari>) => {
      state.usuari_form = payload
    },
    clean_form_usuari: (state) => {
      state.usuari_form = initialState.usuari_form
    },
    clean_usuaris: (state) => {
      state.usuari_usuari = initialState.usuari_usuari
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_usuaris.pending, (state) => {
        state.usuari_loadin = true
      })
      .addCase(get_usuaris.fulfilled, (state, { payload }) => {
        state.usuari_loadin = false

        const { estado, mensaje, data } = payload

        if (estado === 1) {
          state.usuari_usuari = data.usuarios
          state.usuari_paginat = data.paginacion
        } else {
          toast.warning(mensaje)
          state.usuari_usuari = initialState.usuari_usuari
          state.usuari_paginat = initialState.usuari_paginat
        }
      })

      .addCase(put_usuari.pending, () => {
        toastId = toast.loading("Actualizando usuario....")
      })
      .addCase(put_usuari.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 2000,
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

      .addCase(post_usuari.pending, () => {
        toastId = toast.loading("Creando usuario....")
      })
      .addCase(post_usuari.fulfilled, (state, { payload }) => {
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          state.usuari_creado = data.usuario_creado
          state.usuari_opemod.isOpen = true

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

      .addCase(delete_usuari.pending, () => {
        toastId = toast.loading("Creando usuario....")
      })
      .addCase(delete_usuari.fulfilled, (_, { payload }) => {
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
            "Se a producido un error. Ponte en contacto con el administrador",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      })
  },
})

export const UsuariReducer = UsuariSlice.reducer

export const { set_usuari, close_modal, clean_form_usuari, clean_usuaris } =
  UsuariSlice.actions
