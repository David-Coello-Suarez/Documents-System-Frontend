import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { get_subsec_active } from "../../controllers/subsec"
import { clean_subsecs } from "../../reducers/subsec"
import { SelectBox } from "../views"

interface isubsec {
  nameSelect: string
  handleChange: (subsec: number) => void
  classInvalid?: string | undefined
  value: number
  displayLabel?: string
  refreshValue: number
}

const SubsecActive = (element: isubsec) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (element.refreshValue > 0) {
      dispatch(get_subsec_active(element.refreshValue))
    }

    return () => {
      dispatch(clean_subsecs())
    }
  }, [dispatch, element.refreshValue])

  const { loadin_loadin, subsecs_subsecs } = useAppSelector(
    (state) => state.subsec,
  )

  const categories = subsecs_subsecs.map((subsec) => ({
    value: subsec.subsec_subsec.toString(),
    label: subsec.subsec_nombre.toUpperCase(),
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
        isDisabled={subsecs_subsecs.length === 0}
        value={categories.filter((cp) => Number(cp.value) === element.value)}
      />
      {Boolean(element.classInvalid) && (
        <small className="text-danger">{element.classInvalid}</small>
      )}
    </div>
  )
}

export default SubsecActive
