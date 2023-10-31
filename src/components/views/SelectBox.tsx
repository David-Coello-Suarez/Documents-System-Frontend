import { useState } from "react"
import Select from "react-select"

interface iselectbox {
  name: string
  options: { value: string; label: string }[]
  onChange: (x: { value: string; label: string } | null) => void
  [key: string]: unknown
}
const SelectBox = ({ name, onChange, options, ...rest }: iselectbox) => {
  const [optionSelected, setSelectedOptions] = useState<{
    value: string
    label: string
  } | null>(null)

  const handleChange = (selected: { value: string; label: string } | null) => {
    onChange(selected)
    setSelectedOptions(selected)
  }

  return (
    <Select
      options={options}
      closeMenuOnSelect={true}
      onChange={handleChange}
      value={optionSelected}
      name={name}
      {...rest}
      placeholder={"ESCOJE UN OPCIÓN"}
      noOptionsMessage={() =>
        "NO HAY DATOS DISPONIBLE, CON EL CRITERIO INGRESADO"
      }
    />
  )
}

export default SelectBox
