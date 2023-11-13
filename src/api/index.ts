import axios from "axios"

const base_url = import.meta.env.VITE_APP_URL
const version_api = import.meta.env.VITE_APP_VRS

export const instanciaAxios = axios.create({
  baseURL: `${base_url}/${version_api}/api`,

  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
})

instanciaAxios.interceptors.request.use(
  (config) => {
    config.headers["x-token"] = localStorage.getItem("token") || ""

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
