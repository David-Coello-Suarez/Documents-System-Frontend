import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "@/api/index"
import { irespuesta, iusuari } from "../interfaces"
import { NavigateFunction } from "react-router-dom"

interface isaveusuari {
  usuari: iusuari
  navigate: NavigateFunction
}

export const SaveUsuari = createAsyncThunk(
  "usuari/SaveUsuari",
  async ({ usuari }: isaveusuari) => {
    const { data } = await instanciaAxios.post("/usuari", usuari)

    return data
  },
)

export const UpdateUsuari = createAsyncThunk(
  "usuari/UpdateUsuari",
  async ({ usuari, navigate }: isaveusuari) => {
    const { data } = await instanciaAxios.put<irespuesta>(
      `/usuari/${usuari.usuari_usuari}`,
      usuari,
    )

    if (data.estado == 1) {
      navigate(-1)
    }

    return data
  },
)
