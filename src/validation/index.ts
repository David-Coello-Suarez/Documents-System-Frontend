import * as yup from "yup"
import { iprofil, iusuari } from "../interfaces"

export const ProfilSchema = yup.object<iprofil>().shape({
  profil_abbrev: yup.string().required("Abreviatura es requerido"),
  profil_nampro: yup.string().required("Nombre es requerido"),
})

export const UsuarioSchema = yup.object<iusuari>().shape({
  usuari_nomusu: yup.string().required("Nombre de usuario es requerido"),
  usuari_nomape: yup.string().required("Nombre y apellido es requerido"),
  usuari_correo: yup
    .string()
    .required("Correo electrónico es requerido")
    .email("Formato de email incorrecto"),
  usuari_idperf: yup.number().min(1, "Debe seleccionar un perfil"),
})
