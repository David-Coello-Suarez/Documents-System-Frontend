import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "@/api/index"
import { irespuesta, iusuari } from "../interfaces"
import { NavigateFunction } from "react-router-dom"

interface isaveusuari {
  usuari: iusuari
  navigate: NavigateFunction
}

interface iresponse {
  usuario: string
  contrasena: string
  usuarios: iusuari[]
}

export const listar_usuario = createAsyncThunk(
  "usuari/listar_usuario",
  async () => {
    const { data } = await instanciaAxios.get<irespuesta<iresponse>>("/usuari")

    return data
  },
)

export const SaveUsuari = createAsyncThunk(
  "usuari/SaveUsuari",
  async ({ usuari }: isaveusuari) => {
    const { data } = await instanciaAxios.post<irespuesta<iresponse>>(
      "/usuari",
      usuari,
    )

    return data
  },
)

export const UpdateUsuari = createAsyncThunk(
  "usuari/UpdateUsuari",
  async ({ usuari, navigate }: isaveusuari) => {
    const { data } = await instanciaAxios.put<irespuesta<iresponse>>(
      `/usuari/${usuari.usuari_usuari}`,
      usuari,
    )

    if (data.estado == 1) {
      navigate(-1)
    }

    return data
  },
)
