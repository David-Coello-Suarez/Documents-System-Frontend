import { memo } from "react"

interface iinputcontrol {
  titleLabel: string
  nameInput: string
  classInvalid?: string
  value: string | number
  handleBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  type?: boolean
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
    type,
  } = inputprop

  return (
    <>
      <div className="form-group">
        <label htmlFor={nameInput}>
          {titleLabel} {required && <span className="text-danger">*</span>}
        </label>
        <input
          type={type ? "password" : "text"}
          value={value}
          id={nameInput}
          name={nameInput}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`form-control ${Boolean(classInvalid) && "is-invalid"}`}
        />
        {Boolean(classInvalid) && (
          <small className="text-danger">{classInvalid}</small>
        )}
      </div>
    </>
  )
}

export default memo(InputControl)
