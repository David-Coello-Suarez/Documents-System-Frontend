import { createAsyncThunk } from "@reduxjs/toolkit"
import { instanciaAxios } from "../api"
import { iprofil, irespuesta } from "../interfaces"
import { NavigateFunction } from "react-router-dom"

interface isaveprofile {
  profil: iprofil
  navigate?: NavigateFunction
}

export const getProfil = createAsyncThunk("profile/getProfil", async () => {
  const respuesta = await instanciaAxios.get("/perfil")

  return respuesta.data
})

export const get_profil_manten = createAsyncThunk(
  "profile/get_profil_manten",
  async () => {
    const { data } = await instanciaAxios.get<
      irespuesta<{ perfiles: iprofil[] }>
    >("/perfil/manten")

    return data
  },
)

export const post_profile = createAsyncThunk(
  "profil/post_profile",
  async ({ profil, navigate }: isaveprofile) => {
    const { data } = await instanciaAxios.post<irespuesta>(`/perfil`, profil)

    if (data.estado == 1 && navigate) {
      navigate(-1)
    }

    return data
  },
)

export const put_profile = createAsyncThunk(
  "profil/put_profile",
  async ({ profil, navigate }: isaveprofile, thunk) => {
    const { data } = await instanciaAxios.put<irespuesta>(
      `/perfil/${profil.profil_profil}`,
      profil,
    )

    if (data.estado == 1 && navigate) {
      navigate(-1)
    } else {
      thunk.dispatch(get_profil_manten())
    }

    return data
  },
)
