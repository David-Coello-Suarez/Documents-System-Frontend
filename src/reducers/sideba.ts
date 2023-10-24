import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { irespuesta, isideba } from "../interfaces"
import { getSideba, getSidebaMenu } from "../controllers/sidebar"

interface iressid extends irespuesta {
  data: {
    sideba: isideba[]
  }
}

const initialState = {
  sideba_sideba: Array<isideba>(),
  sideba_mensid: Array<isideba>(),
}

const SidebaSlice = createSlice({
  name: "sideba",
  initialState,
  reducers: {
    clean_sidmen: (state) => {
      state.sideba_mensid = initialState.sideba_mensid
    },
    clean_sidebar: (state) => {
      state.sideba_sideba = initialState.sideba_sideba
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSideba.pending, (state) => state)
      .addCase(
        getSideba.fulfilled,
        (state, { payload }: PayloadAction<iressid>) => {
          const { estado, data } = payload

          if (estado === 1) {
            state.sideba_sideba = data.sideba
          }
        },
      )

    builder
      .addCase(getSidebaMenu.pending, (state) => state)
      .addCase(
        getSidebaMenu.fulfilled,
        (state, { payload }: PayloadAction<iressid>) => {
          const { estado, data } = payload

          if (estado === 1) {
            state.sideba_mensid = data.sideba
          }
        },
      )
  },
})

export const SidebaReducer = SidebaSlice.reducer

export const { clean_sidebar, clean_sidmen } = SidebaSlice.actions
