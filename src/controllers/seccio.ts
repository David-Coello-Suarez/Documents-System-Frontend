import { NavigateFunction } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { ipagina, irespue, iseccio } from "../interfaces"

const file = "seccio",
  rute = "seccio"

interface iressu {
  paginacion: ipagina
  seccios: iseccio[]
}

interface isusaup {
  body: iseccio
  navigate?: NavigateFunction
}

export const get_seccios = createAsyncThunk(
  `${file}/get_seccios`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iressu>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_seccio_active = createAsyncThunk(
  `${file}/get_seccio_active`,
  async () => {
    const { data } = await instanciaAxios.get<irespue<iressu>>(
      `/${rute}/active`,
    )

    return data
  },
)

export const post_seccio = createAsyncThunk(
  `${file}/post_seccio`,
  async ({ body, navigate }: isusaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    return data
  },
)

export const put_seccio = createAsyncThunk(
  `${file}/put_seccio`,
  async ({ body, navigate }: isusaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { seccio_seccio: body.seccio_seccio },
    })

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    thunk.dispatch(get_seccios())

    return data
  },
)

export const delete_seccio = createAsyncThunk(
  `${file}/delete_seccio`,
  async ({ body }: isusaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { seccio_seccio: body.seccio_seccio },
    })

    if (data.estado === 1) {
      thunk.dispatch(get_seccios())
    }

    return data
  },
)
