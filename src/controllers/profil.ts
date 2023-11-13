import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { ipagina, iprofil, irespue } from "../interfaces"
import { NavigateFunction } from "react-router-dom"
import { clean_form_perfil } from "../reducers/perfil"

const file = "profil",
  rute = "perfil"

interface irespro {
  paginacion: ipagina
  perfiles: iprofil[]
}

interface iprsaup {
  body: iprofil
  navigate?: NavigateFunction
}

export const get_perfils = createAsyncThunk(
  `${file}/get_perfils`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<irespro>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_profils_active = createAsyncThunk(
  `${file}/get_profils_active`,
  async () => {
    const { data } = await instanciaAxios.get<irespue<irespro>>(
      `/${rute}/active`,
    )

    return data
  },
)

export const post_prefil = createAsyncThunk(
  `${file}/post_prefil`,
  async ({ body, navigate }: iprsaup, thunk) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) {
      thunk.dispatch(get_perfils())
      thunk.dispatch(clean_form_perfil())
      navigate(-1)
    }

    return data
  },
)

export const put_perfil = createAsyncThunk(
  `${file}/put_perfil`,
  async ({ body, navigate }: iprsaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(
      `/${rute}/${body.profil_profil}`,
      body,
    )

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }
    thunk.dispatch(get_perfils())
    thunk.dispatch(clean_form_perfil())

    return data
  },
)

export const delete_perfil = createAsyncThunk(
  `${file}/delete_perfil`,
  async ({ body }: iprsaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(
      `/${rute}/${body.profil_profil}`,
    )

    if (data.estado === 1) {
      thunk.dispatch(get_perfils())
    }

    return data
  },
)
