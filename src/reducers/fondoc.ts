import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ifondoc } from "../interfaces"

const initialState = {
  fondoc_fondoc: [
    {
      fondoc_fondoc: 1,
      fondoc_abrevi: "ADD 1",
      fondoc_nombre: "AGREGAR",
      fondoc_estado: "A",
    },
    {
      fondoc_fondoc: 3,
      fondoc_abrevi: "ADD 22",
      fondoc_nombre: "AGREGAR",
      fondoc_estado: "A",
    },
    {
      fondoc_fondoc: 2,
      fondoc_abrevi: "ADD 3",
      fondoc_nombre: "AGREGAR",
      fondoc_estado: "A",
    },
  ],
  fondoc_state: {
    fondoc_fondoc: 0,
    fondoc_abrevi: "",
    fondoc_nombre: "",
  },
}

const FonDocSlice = createSlice({
  name: "fondoc",
  initialState,
  reducers: {
    set_fondoc: (state, { payload }: PayloadAction<ifondoc>) => {
      state.fondoc_state = payload
    },
    clean_fondoc_form: (state) => {
      state.fondoc_state = initialState.fondoc_state
    },
  },
})

export const FonDocReducer = FonDocSlice.reducer

export const { set_fondoc, clean_fondoc_form } = FonDocSlice.actions
