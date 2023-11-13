import { NavigateFunction } from "react-router-dom"
import { ipagina, irespue, iseriex } from "../interfaces"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"

const file = "seriex",
  rute = "seriex"

interface iresser {
  paginacion: ipagina
  seriexs: iseriex[]
}

interface isesaup {
  body: iseriex
  navigate?: NavigateFunction
}

export const get_seriexs = createAsyncThunk(
  `${file}/get_seriexs`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iresser>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_seriexs_active = createAsyncThunk(
  `${file}/get_seriexs_active`,
  async (subsec_subsec: number) => {
    const { data } = await instanciaAxios.get<irespue<iresser>>(
      `/${rute}/active`,
      {
        params: { subsec_subsec },
      },
    )

    return data
  },
)

export const post_seriex = createAsyncThunk(
  `${file}/post_seriex`,
  async ({ body, navigate }: isesaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    return data
  },
)

export const put_seriex = createAsyncThunk(
  `${file}/put_seriex`,
  async ({ body, navigate }: isesaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { seriex_seriex: body.seriex_seriex },
    })

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    thunk.dispatch(get_seriexs())

    return data
  },
)

export const delete_seriex = createAsyncThunk(
  `${file}/delete_seriex`,
  async ({ body }: isesaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { seriex_seriex: body.seriex_seriex },
    })

    if (data.estado === 1) {
      thunk.dispatch(get_seriexs())
    }

    return data
  },
)
