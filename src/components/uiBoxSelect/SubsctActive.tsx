import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { icompon } from "../../interfaces"
import { get_subscts_active } from "../../controllers/subsct"
import { SelectBox } from "../views"
import { clean_subscts } from "../../reducers/subsct"

const SubsctActive = (element: icompon) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (Number(element.refreshValue) > 0)
      dispatch(get_subscts_active(Number(element.refreshValue)))

    return () => {
      dispatch(clean_subscts())
    }
  }, [dispatch, element.refreshValue])

  const { loadin_loadin, subscts_subscts } = useAppSelector(
    (state) => state.subsct,
  )

  const categories = subscts_subscts.map((subsct) => ({
    value: subsct.subsct_subsct.toString(),
    label: subsct.subsct_nombre.toUpperCase(),
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
        isDisabled={subscts_subscts.length === 0}
        value={categories.filter((cp) => Number(cp.value) === element.value)}
      />
      {Boolean(element.classInvalid) && (
        <small className="text-danger">{element.classInvalid}</small>
      )}
    </div>
  )
}

export default SubsctActive
