import { NavigateFunction } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { ipagina, irespue, isubser } from "../interfaces"

const file = "subser",
  rute = "subser"

interface iressub {
  paginacion: ipagina
  subsers: isubser[]
}

interface isusaup {
  body: isubser
  navigate?: NavigateFunction
}

export const get_subsers = createAsyncThunk(
  `${file}/get_subsers`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iressub>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_subsers_active = createAsyncThunk(
  `${file}/get_subsers_active`,
  async (seriex_seriex: number) => {
    const { data } = await instanciaAxios.get<irespue<iressub>>(
      `/${rute}/active`,
      {
        params: { seriex_seriex },
      },
    )

    return data
  },
)

export const post_subser = createAsyncThunk(
  `${file}/post_subser`,
  async ({ body, navigate }: isusaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    return data
  },
)

export const put_subser = createAsyncThunk(
  `${file}/put_subser`,
  async ({ body, navigate }: isusaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { subser_subser: body.subser_subser },
    })

    if (data.estado) {
      if (data.estado === 1 && navigate) {
        navigate(-1)
      }

      if (data.estado === 1) {
        thunk.dispatch(get_subsers())
      }
    }

    return data
  },
)

export const delete_subser = createAsyncThunk(
  `${file}/delete_subser`,
  async ({ body }: isusaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { subser_subser: body.subser_subser },
    })

    if (data.estado === 1) {
      thunk.dispatch(get_subsers())
    }

    return data
  },
)
