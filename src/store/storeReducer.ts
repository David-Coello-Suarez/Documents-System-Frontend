import { configureStore } from "@reduxjs/toolkit"
import { reducer } from "../reducers"

export const storeReducer = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof storeReducer.getState>

export type AppDispatch = typeof storeReducer.dispatch
