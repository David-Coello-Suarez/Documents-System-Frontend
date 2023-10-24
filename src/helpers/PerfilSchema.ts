import * as yup from "yup"
import { iprofil } from "../interfaces"

export const ProfilSchema = yup.object<iprofil>().shape({
  profil_abbrev: yup.string().required("Abreviatura es requerido"),
  profil_nampro: yup.string().required("Nombre es requerido"),
})
