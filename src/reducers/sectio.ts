import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { toast, Id } from "react-toastify"
import { isectio } from "../interfaces"

const initialState = {
  loadin_loadin: false,
  sectios_sectios: Array<isectio>(),
  sectio_sectio: {
    sectio_sectio: 0,
    sectio_nombre: "",
    sectio_abbrev: "",
    sectio_status: 1,
  },
}

let countr_toastId: Id

const SectioSlice = createSlice({
  name: "sectio",
  initialState,
  reducers: {
    clean_sectios: (state) => {
      state.sectios_sectios = initialState.sectios_sectios
    },
    set_form_sectio: (state, { payload }: PayloadAction<isectio>) => {
      state.sectio_sectio = payload
    },
    clean_form_sectio: (state) => {
      state.sectio_sectio = initialState.sectio_sectio
    },
  },
})

export const SectioReducer = SectioSlice.reducer

export const { clean_sectios, clean_form_sectio, set_form_sectio } =
  SectioSlice.actions
