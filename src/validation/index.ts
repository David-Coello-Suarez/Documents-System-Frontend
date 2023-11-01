import * as yup from "yup"
import { ifondoc, iprofil, iseries, isubsec, iusuari } from "../interfaces"

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

export const FonDocSchema = yup.object<ifondoc>().shape({
  fondoc_descri: yup.string().required("Descripción es requerido"),
  fondoc_nombre: yup.string().required("Nombre es requerido"),
})

export const SectioSchema = yup.object<ifondoc>().shape({
  fondoc_fondoc: yup.number().min(1, "Selecciona fondo documental"),
  sectio_abbrev: yup.string().required("Abreviatura es requerido"),
  sectio_nombre: yup.string().required("Nombre es requerido"),
})

export const SubsecSchema = yup.object<isubsec>().shape({
  sectio_sectio: yup.number().min(1, "Selecciona secciión"),
  subsec_abrevv: yup.string().required("Abreviatura es requerido"),
  subsec_nombre: yup.string().required("Nombre es requerido"),
})

export const SeriesSchema = yup.object<iseries>().shape({})

export const SubserSchema = yup.object<isubsec>().shape({})
