import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { irespuesta, isideba } from "../interfaces"
import { getSideba } from "../controllers/sidebar"

interface iressid extends irespuesta {
  data: {
    sideba: isideba[]
  }
}

const initialState = {
  sideba_sideba: Array<isideba>(),
}

const SidebaSlice = createSlice({
  name: "sideba",
  initialState,
  reducers: {
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
  },
})

export const SidebaReducer = SidebaSlice.reducer

export const { clean_sidebar } = SidebaSlice.actions
