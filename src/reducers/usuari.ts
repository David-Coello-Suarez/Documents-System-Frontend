import { SaveUsuari } from "@/controllers/usuari"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { irespuesta } from "../interfaces"

interface iresusu extends irespuesta {
  data: {
    usuario: string
    contrasena: string
  }
}

const initialState = {
  usuari_form: {
    usuari_usuari: 0,
    usuari_nomusu: "",
    usuari_nomape: "",
    usuari_codest: 1,
    usuari_tipaut: 0,
    usuari_correo: "",
    usuari_direcc: 0,
    usuari_perfil: 0,
  },
}

const UsuariSlice = createSlice({
  name: "usuari",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      SaveUsuari.fulfilled,
      (state, { payload }: PayloadAction<iresusu>) => {
        const { estado, mensaje, data } = payload

        if (estado == 1) {
          toast.success(mensaje)
        } else {
          toast.info(mensaje)
        }
      },
    )
  },
})

export const UsuariReducer = UsuariSlice.reducer
