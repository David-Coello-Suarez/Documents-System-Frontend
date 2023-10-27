import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { ipermis, irespuesta } from "../interfaces"

interface imodulo {
  perfil: number
  modulo: number
  permis?: string
}

export const get_modulo = createAsyncThunk(
  "permis/get_modulo",
  async (perper_perper: number, thunk) => {
    const { data } = await instanciaAxios.get<irespuesta<ipermis>>(
      `/permis/modulo/${perper_perper}`,
    )

    if (data.estado == 1) {
      thunk.dispatch(get_permiso_modulo(perper_perper))
    }

    return data
  },
)

export const post_modulo = createAsyncThunk(
  "permis/post_modulo",
  async (body: imodulo, thunk) => {
    const { data } = await instanciaAxios.post<irespuesta<ipermis>>(
      `/permis/modulo`,
      body,
    )

    if (data.estado == 1) {
      thunk.dispatch(get_modulo(body.perfil))
      thunk.dispatch(get_permiso_modulo(body.perfil))
    }

    return data
  },
)

export const get_permiso_modulo = createAsyncThunk(
  "permis/get_permiso_modulo",
  async (perper_perper: number) => {
    const { data } = await instanciaAxios.get<irespuesta<ipermis>>(
      `/permis/modulo/permiso/${perper_perper}`,
    )

    // if (data.estado == 1) {
    //   thunk.dispatch(get_modulo(body.perfil))
    // }

    return data
  },
)

export const get_cabecera_permisos = createAsyncThunk(
  "permis/get_cabecera_permisos",
  async () => {
    const { data } = await instanciaAxios.get<
      irespuesta<{
        cabecera: { permis_permis: number; permis_nombre: string }[]
      }>
    >("/permis/cabecera")

    return data
  },
)

export const post_permiso_modulo = createAsyncThunk(
  "permis/post_permiso_modulo",
  async (body: imodulo, thunk) => {
    const { data } = await instanciaAxios.post<irespuesta>(
      "/permis/modulo/permiso",
      body,
    )

    if (data.estado == 1) {
      thunk.dispatch(get_permiso_modulo(body.perfil))
    }

    return data
  },
)
