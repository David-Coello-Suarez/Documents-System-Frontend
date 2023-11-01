import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// import { toast, Id } from "react-toastify"
import { iseries } from "../interfaces"

const initialState = {
  loadin_loadin: false,
  seriess_seriess: Array<iseries>(),
  series_series: {
    fondoc_fondoc: 0,
    sectio_sectio: 0,
    subsec_subsec: 0,

    series_series: 0,
    series_nombre: "",
    series_abrevv: "",
    series_status: 0,
  },
}

// let toastId: Id

const SeriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    clean_seriess: (state) => {
      state.seriess_seriess = initialState.seriess_seriess
    },
    set_form_series: (state, { payload }: PayloadAction<iseries>) => {
      state.series_series = payload
    },
    clean_form_series: (state) => {
      state.series_series = initialState.series_series
    },
  },
})

export const SeriesReducer = SeriesSlice.reducer

export const { clean_seriess, clean_form_series, set_form_series } =
  SeriesSlice.actions
