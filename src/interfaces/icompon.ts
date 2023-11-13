export interface icompon {
  nameSelect: string
  handleChange: (value: number) => void
  classInvalid?: string | undefined
  value: number
  displayLabel?: string
  refreshValue?: number
}
