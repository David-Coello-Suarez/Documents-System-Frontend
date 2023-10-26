import { createAsyncThunk } from "@reduxjs/toolkit"
import { ipermis, irespuesta } from "../interfaces"
import { instanciaAxios } from "../api"

export const get_permisos = createAsyncThunk(
  "permis/get_permisos",
  async () => {
    const response = await instanciaAxios.get<irespuesta<ipermis>>("/permis/")

    return response.data
  },
)
