import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"

export const getProfil = createAsyncThunk("profile/getProfil", async () => {
  const respuesta = await instanciaAxios.get("/perfil")

  return respuesta.data
})
