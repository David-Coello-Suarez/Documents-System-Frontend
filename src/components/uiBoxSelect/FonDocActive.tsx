import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { clean_fondocs } from "../../reducers/fondoc"
import { SelectBox } from "../views"
import { get_fondoc_active } from "../../controllers/fondoc"

interface isectio {
  nameSelect: string
  handleChange: (fondoc: number) => void
  classInvalid?: string | undefined
  value: number
  displayLabel?: string
}

const FonDocActive = (element: isectio) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(get_fondoc_active())

    return () => {
      dispatch(clean_fondocs())
    }
  }, [dispatch])

  const { loadin_loadin, fondocs_fondocs } = useAppSelector(
    (state) => state.fondoc,
  )

  const categories = fondocs_fondocs.map((fondoc) => ({
    value: fondoc.fondoc_fondoc.toString(),
    label: fondoc.fondoc_nombre,
  }))

  categories.unshift({ value: "0", label: "Selecciona" })

  const handleSelectChange = (
    selected: { value: string; label: string } | null,
  ) => element.handleChange(Number(selected?.value))

  return (
    <>
      <div className="form-group">
        {element.displayLabel && (
          <label htmlFor={element.nameSelect}>
            {element.displayLabel} <span className="text-danger">*</span>
          </label>
        )}

        <SelectBox
          value={categories.filter((cp) => Number(cp.value) === element.value)}
          id={element.nameSelect}
          name={element.nameSelect}
          options={categories}
          onChange={handleSelectChange}
          isLoading={loadin_loadin}
        />
        {Boolean(element.classInvalid) && (
          <small className="text-danger">{element.classInvalid}</small>
        )}
      </div>
    </>
  )
}

export default FonDocActive
