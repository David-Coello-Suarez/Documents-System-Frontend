import { memo } from "react"

interface iinputcontrol {
  titleLabel: string
  nameInput: string
  classInvalid?: boolean
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const InputControl = (inputprop: iinputcontrol) => {
  const { titleLabel, required, nameInput, classInvalid, value, handleChange } =
    inputprop

  return (
    <>
      <div className="form-group">
        <label htmlFor={nameInput}>
          {titleLabel} {required && <span className="text-danger">*</span>}
        </label>
        <input
          type="text"
          id={nameInput}
          name={nameInput}
          className={`form-control ${classInvalid && "is-invalid"}`}
          onChange={handleChange}
          value={value}
        />
      </div>
    </>
  )
}

export default memo(InputControl)
