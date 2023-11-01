import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// import { toast, Id } from "react-toastify"
import { isubsec } from "../interfaces"

const initialState = {
  loadin_loadin: false,
  subsecs_subsecs: Array<isubsec>(),
  subsec_subsec: {
    sectio_sectio: 0,
    sectio_nombre: "",
    subsec_subsec: 0,
    subsec_nombre: "",
    subsec_abrevv: "",
    subsec_status: 1,
  },
}

// let toastId: Id

const SubsecSlice = createSlice({
  name: "subsec",
  initialState,
  reducers: {
    clean_subsecs: (state) => {
      state.subsecs_subsecs = initialState.subsecs_subsecs
    },
    set_form_subsec: (state, { payload }: PayloadAction<isubsec>) => {
      state.subsec_subsec = payload
    },
    clean_form_subsec: (state) => {
      state.subsec_subsec = initialState.subsec_subsec
    },
  },
})

export const SubsecReducer = SubsecSlice.reducer

export const { clean_subsecs, clean_form_subsec, set_form_subsec } =
  SubsecSlice.actions
