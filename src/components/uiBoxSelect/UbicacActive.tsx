import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { icompon } from "../../interfaces"
import { get_ubicacs_active } from "../../controllers/ubicac"
import { clean_ubicacs } from "../../reducers/ubicac"
import { SelectBox } from "../views"

const Ubicac = (element: icompon) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (element.refreshValue > 0) {
      dispatch(get_ubicacs_active(element.refreshValue))
    }

    return () => {
      dispatch(clean_ubicacs())
    }
  }, [dispatch, element.refreshValue])

  const { loadin_loadin, ubicacs_ubicacs } = useAppSelector(
    (state) => state.ubicac,
  )

  const categories = ubicacs_ubicacs.map((ubicac) => ({
    value: ubicac.ubicac_ubicac.toString(),
    label: ubicac.ubicac_descri.toUpperCase(),
  }))

  categories.unshift({ value: "0", label: "SELECCIONA" })

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
        isDisabled={ubicacs_ubicacs.length === 0}
        value={categories.filter((cp) => Number(cp.value) === element.value)}
      />
      {Boolean(element.classInvalid) && (
        <small className="text-danger">{element.classInvalid}</small>
      )}
    </div>
  )
}

export default Ubicac
