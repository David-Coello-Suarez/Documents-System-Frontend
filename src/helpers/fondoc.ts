import * as yup from "yup"
import { ifondoc } from "../interfaces"

export const FormDocSchema = yup.object<ifondoc>().shape({
  fondoc_abrevi: yup.string().required("Abreviatura es requerido"),
  fondoc_nombre: yup.string().required("Nombre es requerido"),
})
