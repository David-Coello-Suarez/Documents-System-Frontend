import { lazy } from "react"

const NotData = lazy(() => import("./NotData"))
const Perfil = lazy(() => import("./Perfil"))
const Sectio = lazy(() => import("../uiBoxSelect/FonDocActive"))
const AddButton = lazy(() => import("./AddButton"))
const InputControl = lazy(() => import("./InputControl"))
const SelectBox = lazy(() => import("./SelectBox"))

export { NotData, Perfil, Sectio, AddButton, SelectBox, InputControl }
