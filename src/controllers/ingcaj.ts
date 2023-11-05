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
  async ({ body }: iicsaup) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { ingcaj_ingcaj: body.ingcaj_ingcaj },
    })

    return data
  },
)
