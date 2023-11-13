import { NavigateFunction } from "react-router-dom"
import { ipagina, irespue, iusuari } from "../interfaces"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"

const file = "usuari",
  rute = "usuari"

interface iussaup {
  body: iusuari
  navigate?: NavigateFunction
}

interface iresusu {
  paginacion: ipagina
  usuarios: iusuari[]
  usuario_creado: { usuario: string; contrasena: string }
}

export const get_usuaris = createAsyncThunk(
  `${file}/get_usuaris`,
  async (pagina: ipagina | undefined) => {
    const { data } = await instanciaAxios.get<irespue<iresusu>>(`/${rute}`, {
      params: pagina,
    })

    return data
  },
)

export const post_usuari = createAsyncThunk(
  `${file}/post_usuari`,
  async ({ body, navigate }: iussaup) => {
    const { data } = await instanciaAxios.post<irespue<iresusu>>(
      `/${rute}`,
      body,
    )

    if (data.estado === 1 && navigate) {
      navigate(-1)
    }

    return data
  },
)

export const put_usuari = createAsyncThunk(
  `${file}/put_usuari`,
  async ({ body, navigate }: iussaup, thunk) => {
    const { data } = await instanciaAxios.put<irespue<iresusu>>(
      `/${rute}/${body.usuari_usuari}`,
      body,
    )

    if (data.estado === 1 && navigate) {
      navigate(-1)
    } else {
      thunk.dispatch(get_usuaris())
    }

    return data
  },
)

export const delete_usuari = createAsyncThunk(
  `${file}/delete_usuari`,
  async ({ body }: iussaup, thunk) => {
    const { data } = await instanciaAxios.delete<irespue<iresusu>>(
      `/${rute}/${body.usuari_usuari}`,
    )

    if (data.estado === 1) {
      thunk.dispatch(get_usuaris())
    }

    return data
  },
)
