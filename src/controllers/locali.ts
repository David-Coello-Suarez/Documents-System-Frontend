import { NavigateFunction } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { ilocali, ipagina, irespue } from "../interfaces"

const file = "locali",
  rute = "locali"

interface iresloc {
  paginacion: ipagina
  localis: ilocali[]
}

interface ilosaup {
  body: ilocali
  navigate?: NavigateFunction
}

export const get_localis = createAsyncThunk(
  `${file}/get_localis`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iresloc>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_localis_active = createAsyncThunk(
  `${file}/get_localis_active`,
  async (seriex_seriex: number) => {
    const { data } = await instanciaAxios.get<irespue<iresloc>>(
      `/${rute}/active`,
      {
        params: { seriex_seriex },
      },
    )

    return data
  },
)

export const post_locali = createAsyncThunk(
  `${file}/post_locali`,
  async ({ body, navigate }: ilosaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    return data
  },
)

export const put_locali = createAsyncThunk(
  `${file}/put_locali`,
  async ({ body, navigate }: ilosaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { locali_locali: body.locali_locali },
    })

    if (data.estado) {
      if (data.estado === 1 && navigate) {
        navigate(-1)
      }

      if (data.estado === 1) {
        thunk.dispatch(get_localis())
      }
    }

    return data
  },
)

export const delete_locali = createAsyncThunk(
  `${file}/delete_locali`,
  async ({ body }: ilosaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { locali_locali: body.locali_locali },
    })

    if (data.estado === 1) {
      thunk.dispatch(get_localis())
    }

    return data
  },
)
