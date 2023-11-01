import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { get_seccio_active } from "../../controllers/seccio"
import { clean_seccios } from "../../reducers/seccio"
import { SelectBox } from "../views"

interface iseccio {
  nameSelect: string
  handleChange: (fondoc: number) => void
  classInvalid?: string | undefined
  value: number
  displayLabel?: string
  refreshValue: number
}

const SeccioActive = (element: iseccio) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (element.refreshValue) {
      dispatch(get_seccio_active(element.refreshValue))
    }

    return () => {
      dispatch(clean_seccios())
    }
  }, [dispatch, element.refreshValue])

  const { loadin_loadin, seccios_seccios } = useAppSelector(
    (state) => state.seccio,
  )

  const categories = seccios_seccios.map((seccio) => ({
    value: seccio.seccio_seccio.toString(),
    label: seccio.seccio_nombre,
  }))

  categories.unshift({ value: "0", label: "Selecciona" })

  const handleSelectChange = (
    selected: { value: string; label: string } | null,
  ) => element.handleChange(Number(selected?.value))

  return (
    <div className="form-group">
      {element.displayLabel && (
        <label htmlFor={element.nameSelect}>
          {element.displayLabel} <span className="text-danger">*</span>
        </label>
      )}

      <SelectBox
        options={categories}
        id={element.nameSelect}
        name={element.nameSelect}
        isLoading={loadin_loadin}
        onChange={handleSelectChange}
        isDisabled={seccios_seccios.length === 0}
        value={categories.filter((cp) => Number(cp.value) === element.value)}
      />
      {Boolean(element.classInvalid) && (
        <small className="text-danger">{element.classInvalid}</small>
      )}
    </div>
  )
}

export default SeccioActive
