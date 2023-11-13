import { NavigateFunction } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { iingcaj, ipagina, irespue } from "../interfaces"

const file = "ingcaj",
  rute = "ingcaj"

interface iresubi {
  ingcaj_ingcaj: number
  paginacion: ipagina
  ingcajs: iingcaj[]
}

interface iicsaup {
  body: iingcaj
  navigate?: NavigateFunction
}

export const get_ingcajs = createAsyncThunk(
  `${file}/get_ingcajs`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iresubi>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_incade = createAsyncThunk(
  `${file}/get_incade`,
  async (ingcaj_ingcaj: number) => {
    const { data } = await instanciaAxios.get<irespue<iresubi>>(
      `/${rute}/incade`,
      {
        params: { ingcaj_ingcaj },
      },
    )

    return data
  },
)

export const post_ingcaj = createAsyncThunk(
  `${file}/post_ingcaj`,
  async ({ body }: iicsaup, thunk) => {
    const { data } = await instanciaAxios.post<irespue<iresubi>>(
      `/${rute}`,
      body,
    )

    if (data.estado === 1) thunk.dispatch(get_incade(data.data.ingcaj_ingcaj))

    return data
  },
)

export const put_ingcaj = createAsyncThunk(
  `${file}/put_ingcaj`,
  async ({ body }: iicsaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { ingcaj_ingcaj: body.ingcaj_ingcaj },
    })

    if (data.estado === 1) thunk.dispatch(get_incade(body.ingcaj_ingcaj))

    return data
  },
)

export const delete_ingcaj = createAsyncThunk(
  `${file}/delete_ingcaj`,
  async ({ body, navigate }: iicsaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { ingcaj_ingcaj: body.ingcaj_ingcaj },
    })

    if (data.estado === 1 && navigate) navigate(-1)
    else thunk.dispatch(get_ingcajs())
  
    return data
  },
)

export const delete_incade = createAsyncThunk(
  `${file}/delete_incade`,
  async ({ body }: iicsaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}/detalle`, {
      params: {
        ingcaj_ingcaj: body.ingcaj_ingcaj,
        ingcaj_numsec: body.ingcaj_numsec,
      },
    })

    if (data.estado === 1) thunk.dispatch(get_incade(body.ingcaj_ingcaj))

    return data
  },
)
