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

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    clean_submenu: (state) => {
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

export const SidebarReducer = SidebarSlice.reducer

export const { clean_submenu } = SidebarSlice.actions
