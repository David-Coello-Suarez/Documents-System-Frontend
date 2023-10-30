import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { iloggin, irespuesta } from "../interfaces"

interface usuario {
  nombreusuario: string
  contrasena: string
}

export const post_loggin = createAsyncThunk(
  "loggin/post_loggin",
  async (body: usuario) => {
    const { data } = await instanciaAxios.post<irespuesta<iloggin>>(
      `/loggin`,
      body,
    )

    return data
  },
)
