import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { isector } from "../interfaces"
import {
  delete_sector,
  get_sectors,
  get_sectors_active,
  post_sector,
  put_sector,
} from "../controllers/sector"

const initialState = {
  loadin_loadin: false,
  sectors_sectors: Array<isector>(),
  sector_pagina: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  sector_sector: {
    locali_locali: 0,
    locali_descri: "",

    sector_sector: 0,
    sector_nombre: "",
    sector_status: 1,

    sector_usucre: "",
    sector_feccre: "",
    sector_usuact: "",
    sector_fecact: "",
  },
}

let toastId: Id

const SectorSlice = createSlice({
  name: "sector",
  initialState,
  reducers: {
    clean_sectors: (state) => {
      state.sectors_sectors = initialState.sectors_sectors
      state.sector_pagina = initialState.sector_pagina
    },
    set_form_sector: (state, { payload }: PayloadAction<isector>) => {
      state.sector_sector = payload
    },
    clean_form_sector: (state) => {
      state.sector_sector = initialState.sector_sector
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_sectors.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_sectors.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.sectors_sectors = data.sectors
          state.sector_pagina = data.paginacion
        } else {
          state.sectors_sectors = initialState.sectors_sectors
          state.sector_pagina = initialState.sector_pagina
        }
      })

      .addCase(get_sectors_active.pending, (state) => {
        state.loadin_loadin = true
        toastId = toast.loading("Obteniendo Sub series .....")
      })
      .addCase(get_sectors_active.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.dismiss(toastId)
          state.sectors_sectors = data.sectors
        } else {
          toast.update(toastId, {
            theme: "colored",
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(post_sector.pending, () => {
        toastId = toast.loading("Creando Sector....")
      })
      .addCase(post_sector.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(put_sector.pending, () => {
        toastId = toast.loading("Actualizando Sector....")
      })
      .addCase(put_sector.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addCase(delete_sector.pending, () => {
        toastId = toast.loading("Eliminando Sector....")
      })
      .addCase(delete_sector.fulfilled, (_, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
        } else {
          toast.update(toastId, {
            render: mensaje,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })

      .addMatcher(isRejected, (state) => {
        state.loadin_loadin = false

        if (!toast.isActive(toastId)) {
          toast.update(toastId, {
            render:
              "Se a producido un error. Ponte en contacto con el administrador1",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          })
        }
      })
  },
})

export const SectorReducer = SectorSlice.reducer

export const { clean_sectors, clean_form_sector, set_form_sector } =
  SectorSlice.actions
