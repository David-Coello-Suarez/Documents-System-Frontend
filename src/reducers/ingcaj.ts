import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { iingcaj } from "../interfaces"
import { get_incade, get_ingcajs, post_ingcaj } from "../controllers/ingcaj"
import moment from "moment"

const initialState = {
  loadin_loadin: false,
  ingcajs_ingcajs: Array<iingcaj>(),
  ingcaj_pagina: { pagina: 0, limite: 0, totalItems: 0, totalPaginas: 0 },
  incaj_ingcaj: {
    ingcaj_ingcaj: 0,
    ingcaj_fecing: moment().format("YYYY-MM-DD"),
    ingcaj_refere: "",
    ingcaj_tiptra: "n",
    ingcaj_titrde: "",
    ingcaj_numegr: 0,
    tipdoc_tipdoc: 0,
    ingcaj_codcaj: "",
    ingcaj_codrif: "",
    ingcaj_aniing: Number(moment().format("YYYY")),
    fondoc_fondoc: 0,
    seccio_seccio: 0,
    subsec_subsec: 0,
    seriex_seriex: 0,
    subser_subser: 0,
    locali_locali: 0,
    sector_sector: 0,
    subsct_subsct: 0,
    ubicac_ubicac: 0,
    tipser_tipser: "n",

    tipdoc_descri: "",
    ingcaj_numdiv: 0,
    subsec_nombre: "",
    subser_nombre: "",
    ubicac_descri: "",
    ubicac_numdiv: "",
    ingcaj_numser: "",
    ingcaj_serref: "",

    ingcaj_desden: 0,
    ingcaj_hastan: 0,
    ingcaj_desdet: "",
    ingcaj_hastat: "",
    ingcaj_desdef: "",
    ingcaj_hastaf: "",

    ingcaj_status: "",
    ingcaj_colsta: "",
    ingcaj_genau: false,
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
        // ingcaj_tiptra: payload.ingcaj_tiptra?.charAt(0).toLowerCase(),
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

      .addCase(post_ingcaj.fulfilled, (state, { payload }) => {
        const { estado, data } = payload

        if (estado === 1) {
          state.incaj_ingcaj = {
            ...initialState.incaj_ingcaj,
            ingcaj_genau: false,
            ingcaj_ingcaj: data.ingcaj_ingcaj,
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
