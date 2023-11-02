import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { get_seriexs_active } from "../../controllers/seriex"
import { clean_seriexs } from "../../reducers/seriex"
import { SelectBox } from "../views"

interface iseriex {
  nameSelect: string
  handleChange: (seriex: number) => void
  classInvalid?: string | undefined
  value: number
  displayLabel?: string
  refreshValue: number
}

const SeriexActive = (element: iseriex) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (element.refreshValue > 0) {
      dispatch(get_seriexs_active(element.refreshValue))
    }

    return () => {
      dispatch(clean_seriexs())
    }
  }, [dispatch, element.refreshValue])

  const { loadin_loadin, seriexs_seriexs } = useAppSelector(
    (state) => state.seriex,
  )

  const categories = seriexs_seriexs.map((seriex) => ({
    value: seriex.seriex_seriex.toString(),
    label: seriex.seriex_nombre.toUpperCase(),
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
        isDisabled={seriexs_seriexs.length === 0}
        value={categories.filter((cp) => Number(cp.value) === element.value)}
      />
      {Boolean(element.classInvalid) && (
        <small className="text-danger">{element.classInvalid}</small>
      )}
    </div>
  )
}

export default SeriexActive
