import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// import { toast, Id } from "react-toastify"
import { isubser } from "../interfaces"

const initialState = {
  loadin_loadin: false,
  subsers_subsers: Array<isubser>(),
  subser_subser: {
    fondoc_fondoc: 0,
    sectio_sectio: 0,
    subsec_subsec: 0,
    series_series: 0,

    subser_subser: 0,
    subseri_nombre: "",
    subseri_status: 1,
  },
}

// let toastId: Id

const SubserSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    clean_subsers: (state) => {
      state.subsers_subsers = initialState.subsers_subsers
    },
    set_form_subser: (state, { payload }: PayloadAction<isubser>) => {
      state.subser_subser = payload
    },
    clean_form_subser: (state) => {
      state.subser_subser = initialState.subser_subser
    },
  },
})

export const SubserReducer = SubserSlice.reducer

export const { clean_subsers, clean_form_subser, set_form_subser } =
  SubserSlice.actions
