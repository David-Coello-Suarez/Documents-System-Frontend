import { createAsyncThunk } from "@reduxjs/toolkit"
import { NavigateFunction } from "react-router-dom"
import { instanciaAxios } from "../api"
import { ifondoc, ipagina, irespue } from "../interfaces"

const file = "fondoc",
  rute = "fondoc"

interface iresfon {
  paginacion: ipagina
  fondocs: ifondoc[]
}

interface ifdsaup {
  body: ifondoc
  navigate?: NavigateFunction
}

export const get_fondocs = createAsyncThunk(
  `${file}/get_fondocs`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iresfon>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_fondoc_active = createAsyncThunk(
  `${file}/get_fondoc_active`,
  async () => {
    const { data } = await instanciaAxios.get<irespue<iresfon>>(
      `/${rute}/active`,
    )

    return data
  },
)

export const post_fondoc = createAsyncThunk(
  `${file}/post_fondoc`,
  async ({ body, navigate }: ifdsaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    return data
  },
)

export const put_fondoc = createAsyncThunk(
  `${file}/put_fondoc`,
  async ({ body, navigate }: ifdsaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { fondoc_fondoc: body.fondoc_fondoc },
    })

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    thunk.dispatch(get_fondocs())

    return data
  },
)

export const delete_fondoc = createAsyncThunk(
  `${file}/delete_fondoc`,
  async ({ body }: ifdsaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { fondoc_fondoc: body.fondoc_fondoc },
    })

    if (data.estado === 1) {
      thunk.dispatch(get_fondocs())
    }

    return data
  },
)
