import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { ipermod, irespue } from "../interfaces"

const file = "permis",
  rute = "permis"

interface irespemo {
  sideba: ipermod[]
}

interface ibomope {
  perfil: number
  modulo: number
  permis?: string
}

export const get_modulo_perfil = createAsyncThunk(
  `${file}/get_modulo_perfil`,
  async (perfil_perfil: number, thunk) => {
    const { data } = await instanciaAxios.get<irespue<irespemo>>(
      `/${rute}/modulo`,
      {
        params: { perfil_perfil },
      },
    )

    if (data.estado === 1) {
      thunk.dispatch(get_permis_modulo(perfil_perfil))
    }

    return data
  },
)

export const get_permis_cabece = createAsyncThunk(
  `${file}/get_permis_cabece`,
  async () => {
    const { data } = await instanciaAxios.get<
      irespue<{ cabecera: { permis_permis: number; permis_nombre: string }[] }>
    >(`/${rute}/cabece`)

    return data
  },
)

export const get_permis_modulo = createAsyncThunk(
  `${file}/get_permis_modulo`,
  async (perfil_perfil: number) => {
    const { data } = await instanciaAxios.get<irespue<irespemo>>(
      `/${rute}/modulo/permis`,
      {
        params: { perfil_perfil },
      },
    )

    return data
  },
)

export const post_modulo_acceso = createAsyncThunk(
  `${file}/post_modulo_acceso`,
  async (permiso_modulo: ibomope, thunk) => {
    const { data } = await instanciaAxios.post<irespue<irespemo>>(
      `/${rute}/modulo`,
      permiso_modulo,
    )

    if (data.estado === 1) {
      thunk.dispatch(get_modulo_perfil(permiso_modulo.perfil))
      thunk.dispatch(get_permis_modulo(permiso_modulo.perfil))
    }

    return data
  },
)

export const post_modulo_permis = createAsyncThunk(
  `${file}/post_modulo_permis`,
  async (permiso_modulo: ibomope, thunk) => {
    const { data } = await instanciaAxios.post<irespue<irespemo>>(
      `/${rute}/modulo/permis`,
      permiso_modulo,
    )

    if (data.estado === 1) {
      thunk.dispatch(get_permis_modulo(permiso_modulo.perfil))
    }

    return data
  },
)
