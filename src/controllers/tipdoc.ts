import { NavigateFunction } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { itipdoc, ipagina, irespue } from "../interfaces"

const file = "tipdoc",
  rute = "tipdoc"

interface iresutido {
  paginacion: ipagina
  tipdocs: itipdoc[]
}

interface itdsaup {
  body: itipdoc
  navigate?: NavigateFunction
}

export const get_tipdocs = createAsyncThunk(
  `${file}/get_tipdocs`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iresutido>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_tipdocs_active = createAsyncThunk(
  `${file}/get_tipdocs_active`,
  async () => {
    const { data } = await instanciaAxios.get<irespue<iresutido>>(
      `/${rute}/active`,
    )

    return data
  },
)

export const post_tipdoc = createAsyncThunk(
  `${file}/post_tipdoc`,
  async ({ body, navigate }: itdsaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) navigate(-1)

    return data
  },
)

export const put_tipdoc = createAsyncThunk(
  `${file}/put_tipdoc`,
  async ({ body, navigate }: itdsaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { tipdoc_tipdoc: body.tipdoc_tipdoc },
    })

    if (data.estado === 1 && navigate) navigate(-1)
    else thunk.dispatch(get_tipdocs())

    return data
  },
)

export const delete_tipdoc = createAsyncThunk(
  `${file}/delete_tipdoc`,
  async ({ body }: itdsaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { tipdoc_tipdoc: body.tipdoc_tipdoc },
    })

    if (data.estado === 1) thunk.dispatch(get_tipdocs())

    return data
  },
)
