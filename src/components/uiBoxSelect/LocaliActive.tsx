import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { get_localis_active } from "../../controllers/locali"
import { clean_localis } from "../../reducers/locali"
import { SelectBox } from "../views"
import { icompon } from "../../interfaces"

const LocaliActive = (element: icompon) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(get_localis_active())

    return () => {
      dispatch(clean_localis())
    }
  }, [dispatch])

  const { loadin_loadin, localis_localis } = useAppSelector(
    (state) => state.locali,
  )

  const categories = localis_localis.map((locali) => ({
    value: locali.locali_locali.toString(),
    label: locali.locali_descri.toUpperCase(),
  }))

  categories.unshift({ value: "0", label: "SELECCIONA" })

  const handleSelectChange = (
    selected: { value: string; label: string } | null,
  ) => element.handleChange(Number(selected?.value))

  return (
    <div className="form-group mb-0">
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
        isDisabled={localis_localis.length === 0}
        value={categories.filter((cp) => Number(cp.value) === element.value)}
      />
      {Boolean(element.classInvalid) && (
        <small className="text-danger">{element.classInvalid}</small>
      )}
    </div>
  )
}

export default LocaliActive
