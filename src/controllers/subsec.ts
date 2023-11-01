import { NavigateFunction } from "react-router-dom"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { ipagina, irespue, isubsec } from "../interfaces"

const file = "subsec",
  rute = "subsec"

interface iressu {
  paginacion: ipagina
  subseccs: isubsec[]
}

interface isusaup {
  body: isubsec
  navigate?: NavigateFunction
}

export const get_subsecs = createAsyncThunk(
  `${file}/get_subsecs`,
  async (pagination: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iressu>>(`/${rute}`, {
      params: pagination,
    })

    return data
  },
)

export const get_subsec_active = createAsyncThunk(
  `${file}/get_subsec_active`,
  async () => {
    const { data } = await instanciaAxios.get<irespue<iressu>>(
      `/${rute}/active`,
    )

    return data
  },
)

export const post_subsec = createAsyncThunk(
  `${file}/post_subsec`,
  async ({ body, navigate }: isusaup) => {
    const { data } = await instanciaAxios.post<irespue>(`/${rute}`, body)

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    return data
  },
)

export const put_subsec = createAsyncThunk(
  `${file}/put_subsec`,
  async ({ body, navigate }: isusaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue>(`/${rute}`, body, {
      params: { subsec_subsec: body.subsec_subsec },
    })

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }
    alert(data)
    thunk.dispatch(get_subsecs())

    return data
  },
)

export const delete_subsec = createAsyncThunk(
  `${file}/delete_subsec`,
  async ({ body }: isusaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue>(`/${rute}`, {
      params: { subsec_subsec: body.subsec_subsec },
    })

    if (data.estado === 1) {
      thunk.dispatch(get_subsecs())
    }

    return data
  },
)
