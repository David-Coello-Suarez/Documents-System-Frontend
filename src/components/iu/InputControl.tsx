import { memo } from "react"

interface iinputcontrol {
  titleLabel: string
  nameInput: string
  classInvalid?: boolean
  value: string
  handleBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const InputControl = (inputprop: iinputcontrol) => {
  const {
    titleLabel,
    required,
    nameInput,
    classInvalid,
    value,
    handleChange,
    handleBlur,
  } = inputprop

  return (
    <>
      <div className="form-group">
        <label htmlFor={nameInput}>
          {titleLabel} {required && <span className="text-danger">*</span>}
        </label>
        <input
          type="text"
          value={value}
          id={nameInput}
          name={nameInput}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`form-control ${classInvalid && "is-invalid"}`}
        />
      </div>
    </>
  )
}

export default memo(InputControl)
