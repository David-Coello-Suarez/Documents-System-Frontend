export interface iingcaj {
  ingcaj_ingcaj: number

  ingcaj_fecing: string
  ingcaj_tiptra: string
  ingcaj_titrde: string
  ingcaj_numegr: number
  ingcaj_status: string
  ingcaj_colsta: string
  ingcaj_desref: string

  ingcaj_usucre: string
  ingcaj_feccre: string
  ingcaj_usuact: string
  ingcaj_fecact: string

  // DETALLE INGRESO CAJA
  ingcaj_numsec: number
  fondoc_fondoc: number
  seccio_seccio: number
  subsec_subsec: number
  seriex_seriex: number
  subser_subser: number
  subser_nombre: string
  tipdoc_tipdoc: number
  tipdoc_descri: string
  locali_locali: number
  sector_sector: number
  subsct_subsct: number
  ubicac_ubicac: number
  ubicac_descri: string

  ingcaj_numdiv: string
  ingcaj_codcaj: string
  ingcaj_codrfi: string
  ingcaj_tipser: string

  ingcaj_desden: number
  ingcaj_hastan: number

  ingcaj_desdef: string
  ingcaj_hastaf: string

  ingcaj_desdet: string
  ingcaj_hastat: string

  ingcaj_anioxx: number
  ingcaj_serref: string

  // AUXILIAR
  ingcaj_genaut: boolean
}
