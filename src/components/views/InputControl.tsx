import { memo } from "react"

interface iinputcontrol {
  titleLabel: string
  nameInput: string
  classInvalid?: string
  value: string | number
  handleBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  type?: "text" | "password" | "date" | "datetime-local" | "number" | "checkbox"
  readonly?: boolean
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
    type = "text",
    readonly,
  } = inputprop

  return (
    <>
      <div className="form-group m-0">
        <label htmlFor={nameInput}>
          {titleLabel} {required && <span className="text-danger">*</span>}
        </label>
        <input
          type={type}
          value={value}
          id={nameInput}
          name={nameInput}
          onBlur={handleBlur}
          onChange={handleChange}
          readOnly={Boolean(readonly)}
          className={`form-control form-control-sm ${
            Boolean(classInvalid) && "is-invalid"
          }`}
        />
        {Boolean(classInvalid) && (
          <small className="text-danger">{classInvalid}</small>
        )}
      </div>
    </>
  )
}

export default memo(InputControl)
