import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { get_subsers_active } from "../../controllers/subser"
import { clean_subsecs } from "../../reducers/subsec"
import { SelectBox } from "../views"
import { icompon } from "../../interfaces"

const SubserActive = (element: icompon) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (element.refreshValue > 0) {
      dispatch(get_subsers_active(element.refreshValue))
    }

    return () => {
      dispatch(clean_subsecs())
    }
  }, [dispatch, element.refreshValue])

  const { loadin_loadin, subsers_subsers } = useAppSelector(
    (state) => state.subser,
  )

  const categories = subsers_subsers.map((subser) => ({
    value: subser.subser_subser.toString(),
    label: subser.subser_nombre.toUpperCase(),
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
        isDisabled={subsers_subsers.length === 0}
        value={categories.filter((cp) => Number(cp.value) === element.value)}
      />
      {Boolean(element.classInvalid) && (
        <small className="text-danger">{element.classInvalid}</small>
      )}
    </div>
  )
}

export default SubserActive
