import { NavigateFunction } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { isector, ipagina, irespue } from "../interfaces"

const file = "sector",
  rute = "sector"

interface iresloc {
  paginacion: ipagina
  sectors: isector[]
}

interface lscsaup {
  body: isector
  navigate?: NavigateFunction
}

export const get_sectors = createAsyncThunk(
  `${file}/get_sectors`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iresloc>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_sectors_active = createAsyncThunk(
  `${file}/get_sectors_active`,
  async (locali_locali: number) => {
    const { data } = await instanciaAxios.get<irespue<iresloc>>(
      `/${rute}/active`,
      {
        params: { locali_locali },
      },
    )

    return data
  },
)

export const post_sector = createAsyncThunk(
  `${file}/post_sector`,
  async ({ body, navigate }: lscsaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) navigate(-1)

    return data
  },
)

export const put_sector = createAsyncThunk(
  `${file}/put_sector`,
  async ({ body, navigate }: lscsaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { sector_sector: body.sector_sector },
    })

    if (data.estado === 1 && navigate) navigate(-1)
    else thunk.dispatch(get_sectors())

    return data
  },
)

export const delete_sector = createAsyncThunk(
  `${file}/delete_sector`,
  async ({ body }: lscsaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { sector_sector: body.sector_sector },
    })

    if (data.estado === 1) thunk.dispatch(get_sectors())

    return data
  },
)
