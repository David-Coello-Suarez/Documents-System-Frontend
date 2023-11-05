import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { icompon } from "../../interfaces"
import { get_sectors_active } from "../../controllers/sector"
import { clean_sectors } from "../../reducers/sector"
import { SelectBox } from "../views"

const SectorActive = (element: icompon) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (Number(element.refreshValue) > 0) {
      dispatch(get_sectors_active(Number(element.refreshValue)))
    }

    return () => {
      dispatch(clean_sectors())
    }
  }, [dispatch, element.refreshValue])

  const { loadin_loadin, sectors_sectors } = useAppSelector(
    (state) => state.sector,
  )

  const categories = sectors_sectors.map((sector) => ({
    value: sector.sector_sector.toString(),
    label: sector.sector_nombre.toUpperCase(),
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
        isDisabled={sectors_sectors.length === 0}
        value={categories.filter((cp) => Number(cp.value) === element.value)}
      />
      {Boolean(element.classInvalid) && (
        <small className="text-danger">{element.classInvalid}</small>
      )}
    </div>
  )
}

export default SectorActive
