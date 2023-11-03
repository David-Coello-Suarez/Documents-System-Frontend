import { NavigateFunction } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { isubsct, ipagina, irespue } from "../interfaces"

const file = "subsct",
  rute = "subsct"

interface iressub {
  paginacion: ipagina
  subscts: isubsct[]
}

interface lscsaup {
  body: isubsct
  navigate?: NavigateFunction
}

export const get_subscts = createAsyncThunk(
  `${file}/get_subscts`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iressub>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_subscts_active = createAsyncThunk(
  `${file}/get_subscts_active`,
  async (sector_sector: number) => {
    const { data } = await instanciaAxios.get<irespue<iressub>>(
      `/${rute}/active`,
      {
        params: { sector_sector },
      },
    )

    return data
  },
)

export const post_subsct = createAsyncThunk(
  `${file}/post_subsct`,
  async ({ body, navigate }: lscsaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) navigate(-1)

    return data
  },
)

export const put_subsct = createAsyncThunk(
  `${file}/put_subsct`,
  async ({ body, navigate }: lscsaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { sector_sector: body.sector_sector },
    })

    if (data.estado === 1 && navigate) navigate(-1)

    if (data.estado === 1) thunk.dispatch(get_subscts())

    return data
  },
)

export const delete_subsct = createAsyncThunk(
  `${file}/delete_subsct`,
  async ({ body }: lscsaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { sector_sector: body.sector_sector },
    })

    if (data.estado === 1) thunk.dispatch(get_subscts())

    return data
  },
)
