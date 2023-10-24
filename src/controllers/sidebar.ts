import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"

export const getSideba = createAsyncThunk("sidebar/getSideba", async () => {
  const respuesta = await instanciaAxios.get("/sideba")

  return respuesta.data
})

export const getSidebaMenu = createAsyncThunk(
  "sidebar/getSidebaMenu",
  async () => {
    const respuesta = await instanciaAxios.get("/sideba/menu")

    return respuesta.data
  },
)
