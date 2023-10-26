export interface irespuesta<T = any> {
  estado: number
  mensaje: string
  data: T
}
