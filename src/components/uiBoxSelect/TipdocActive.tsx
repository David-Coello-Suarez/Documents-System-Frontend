import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { get_tipdocs_active } from "../../controllers/tipdoc"
import { clean_tipdocs } from "../../reducers/tipdoc"
import { icompon } from "../../interfaces"
import { SelectBox } from "../views"

const TipdocActive = (element: icompon) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(get_tipdocs_active())

    return () => {
      dispatch(clean_tipdocs())
    }
  }, [dispatch])

  const { loadin_loadin, tipdocs_tipdocs } = useAppSelector(
    (state) => state.tipdoc,
  )

  const categories = tipdocs_tipdocs.map((tipdoc) => ({
    value: tipdoc.tipdoc_tipdoc.toString(),
    label: tipdoc.tipdoc_descri.toUpperCase(),
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
        isDisabled={tipdocs_tipdocs.length === 0}
        value={categories.filter((cp) => Number(cp.value) === element.value)}
      />
      {Boolean(element.classInvalid) && (
        <small className="text-danger">{element.classInvalid}</small>
      )}
    </div>
  )
}
export default TipdocActive
