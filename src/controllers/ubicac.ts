import { NavigateFunction } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { iubicac, ipagina, irespue } from "../interfaces"

const file = "ubicac",
  rute = "ubicac"

interface iresubi {
  paginacion: ipagina
  ubicacs: iubicac[]
}

interface iubsaup {
  body: iubicac
  navigate?: NavigateFunction
}

export const get_ubicacs = createAsyncThunk(
  `${file}/get_ubicacs`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iresubi>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_ubicacs_active = createAsyncThunk(
  `${file}/get_ubicacs_active`,
  async (subsct_subsct: number) => {
    const { data } = await instanciaAxios.get<irespue<iresubi>>(
      `/${rute}/active`,
      {
        params: { subsct_subsct },
      },
    )

    return data
  },
)

export const post_ubicac = createAsyncThunk(
  `${file}/post_ubicac`,
  async ({ body, navigate }: iubsaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) navigate(-1)

    return data
  },
)

export const put_ubicac = createAsyncThunk(
  `${file}/put_ubicac`,
  async ({ body, navigate }: iubsaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { sector_sector: body.sector_sector },
    })

    if (data.estado === 1 && navigate) navigate(-1)

    if (data.estado === 1) thunk.dispatch(get_ubicacs())

    return data
  },
)

export const delete_ubicac = createAsyncThunk(
  `${file}/delete_ubicac`,
  async ({ body }: iubsaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { sector_sector: body.sector_sector },
    })

    if (data.estado === 1) thunk.dispatch(get_ubicacs())

    return data
  },
)
