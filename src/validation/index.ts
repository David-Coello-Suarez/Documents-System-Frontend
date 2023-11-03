import * as yup from "yup"
import {
  ifondoc,
  ilocali,
  iprofil,
  isector,
  iseriex,
  isubsec,
  isubser,
  iusuari,
} from "../interfaces"

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
  seccio_abrevi: yup.string().required("Abreviatura es requerido"),
  seccio_nombre: yup.string().required("Nombre es requerido"),
})

export const SubsecSchema = yup.object<isubsec>().shape({
  fondoc_fondoc: yup.number().min(1, "Selecciona un fondo documental"),
  seccio_seccio: yup.number().min(1, "Selecciona seción"),
  subsec_nombre: yup.string().required("Nombre es requerido"),
})

export const SeriexSchema = yup.object<iseriex>().shape({
  fondoc_fondoc: yup.number().min(1, "Selecciona un fondo documental"),
  seccio_seccio: yup.number().min(1, "Selecciona una seción"),
  subsec_subsec: yup.number().min(1, "Selecciona una sub seción"),

  seriex_nombre: yup.string().required("Abreviatura es requerido"),
  seriex_abrevi: yup.string().required("Nombre es requerido"),
})

export const SubserSchema = yup.object<isubser>().shape({
  fondoc_fondoc: yup.number().min(1, "Selecciona un fondo documental"),
  seccio_seccio: yup.number().min(1, "Selecciona una seción"),
  subsec_subsec: yup.number().min(1, "Selecciona una sub seción"),
  seriex_seriex: yup.number().min(1, "Selecciona una serie"),

  subser_nombre: yup.string().required("Nombre es requerido"),
})

export const LocaliSchema = yup.object<ilocali>().shape({
  locali_descri: yup.string().required("Descripción es requerido"),
})

export const SectorSchema = yup.object<isector>().shape({
  locali_locali: yup.number().min(1, "Selecciona una localidad"),
  sector_nombre: yup.string().required("Descripción es requerido"),
})
