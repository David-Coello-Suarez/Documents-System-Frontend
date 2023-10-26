import * as yup from "yup"
import { iusuari } from "../interfaces"

export const UsuariShema = yup.object<iusuari>().shape({
  usuari_nomape: yup.string().required("Nombre y apellido es requerido"),
  usuari_nomusu: yup.string().required("Nombre de usuario es requerido"),
  usuari_correo: yup
    .string()
    .required("Correo electrónico es requerido")
    .email(),
  usuari_idtiau: yup.number().min(-1, "Selecciona el perfil del usuario"),
  usuari_idperf: yup.number().min(1, "Selecciona el perfil del usuario"),
})
