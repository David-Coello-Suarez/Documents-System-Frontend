import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { iingcaj } from "../interfaces"
import {
  delete_incade,
  get_incade,
  get_ingcajs,
  post_ingcaj,
  put_ingcaj,
} from "../controllers/ingcaj"
import moment from "moment"

const initialState = {
  loadin_loadin: false,
  ingcajs_ingcajs: Array<iingcaj>(),
  ingcaj_pagina: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  incaj_ingcaj: {
    ingcaj_ingcaj: 0,

    ingcaj_fecing: moment().format("YYYY-MM-DD"),
    ingcaj_tiptra: "",
    ingcaj_titrde: "",
    ingcaj_numegr: 0,
    ingcaj_status: "",
    ingcaj_colsta: "",
    ingcaj_desref: "",

    ingcaj_usucre: "",
    ingcaj_feccre: "",
    ingcaj_usuact: "",
    ingcaj_fecact: "",

    // DETALLE INGRESO CAJA
    ingcaj_numsec: 0,
    fondoc_fondoc: 0,
    seccio_seccio: 0,
    subsec_subsec: 0,
    seriex_seriex: 0,
    subser_subser: 0,
    subser_nombre: "",
    tipdoc_tipdoc: 0,
    tipdoc_descri: "",
    locali_locali: 0,
    sector_sector: 0,
    subsct_subsct: 0,
    ubicac_ubicac: 0,
    ubicac_descri: "",

    ingcaj_numdiv: "",
    ingcaj_codcaj: "",
    ingcaj_codrfi: "",
    ingcaj_tipser: "",

    ingcaj_desden: 0,
    ingcaj_hastan: 0,

    ingcaj_desdef: "",
    ingcaj_hastaf: "",

    ingcaj_desdet: "",
    ingcaj_hastat: "",

    ingcaj_anioxx: Number(moment().format("YYYY")),
    ingcaj_serref: "",

    // AUXILIAR
    ingcaj_genaut: false,
  },
}

let toastId: Id

const IngcajSlice = createSlice({
  name: "ingcaj",
  initialState,
  reducers: {
    clean_ingcajs: (state) => {
      state.ingcajs_ingcajs = initialState.ingcajs_ingcajs
      state.ingcaj_pagina = initialState.ingcaj_pagina
    },
    set_form_ingcaj: (state, { payload }: PayloadAction<iingcaj>) => {
      state.incaj_ingcaj = {
        ...state.incaj_ingcaj,
        ...payload,
      }
    },
    clean_form_ingcaj: (state) => {
      state.incaj_ingcaj = initialState.incaj_ingcaj
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get_ingcajs.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_ingcajs.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.ingcajs_ingcajs = data.ingcajs
          state.ingcaj_pagina = data.paginacion
        } else {
          state.ingcajs_ingcajs = initialState.ingcajs_ingcajs
          state.ingcaj_pagina = initialState.ingcaj_pagina
        }
      })

      .addCase(get_incade.pending, (state) => {
        state.loadin_loadin = true
      })
      .addCase(get_incade.fulfilled, (state, { payload }) => {
        state.loadin_loadin = false

        const { estado, data } = payload

        if (estado === 1) {
          state.ingcajs_ingcajs = data.ingcajs
        } else {
          state.ingcajs_ingcajs = initialState.ingcajs_ingcajs
        }
      })

      .addCase(post_ingcaj.pending, () => {
        toastId = toast.loading("Creando item....")
      })
      .addCase(post_ingcaj.fulfilled, (state, { payload }) => {
        const { estado, mensaje, data } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
          state.incaj_ingcaj = {
            ...initialState.incaj_ingcaj,
            ingcaj_ingcaj: data.ingcaj_ingcaj,
          }
        }
      })

      .addCase(put_ingcaj.pending, () => {
        toastId = toast.loading("Actualizando item....")
      })
      .addCase(put_ingcaj.fulfilled, (state, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
          state.incaj_ingcaj = {
            ...initialState.incaj_ingcaj,
            ingcaj_ingcaj: state.incaj_ingcaj.ingcaj_ingcaj,
          }
        }
      })

      .addCase(delete_incade.pending, () => {
        toastId = toast.loading("Eliminando item....")
      })
      .addCase(delete_incade.fulfilled, (state, { payload }) => {
        const { estado, mensaje } = payload

        if (estado === 1) {
          toast.update(toastId, {
            render: mensaje,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
          state.incaj_ingcaj = {
            ...initialState.incaj_ingcaj,
            ingcaj_ingcaj: state.incaj_ingcaj.ingcaj_ingcaj,
          }
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

export const IngcajReducer = IngcajSlice.reducer

export const { clean_ingcajs, set_form_ingcaj, clean_form_ingcaj } =
  IngcajSlice.actions
