interface istatuscontrol {
  title: string
  nameInput: string
  checkvalue: number
  required?: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StatusControl = (status: istatuscontrol) => {
  const { title, required, checkvalue, handleChange, nameInput } = status
  console.log(checkvalue)
  return (
    <>
      <div className="form-group">
        <label className="display-block">
          {title} {required && <span className="text-danger">*</span>}
        </label>
        <div className="form-check form-check-inline">
          <input
            value={1}
            type="radio"
            name={nameInput}
            onChange={handleChange}
            checked={checkvalue == 1}
            id={`${nameInput}_active`}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor={`${nameInput}_active`}>
            Activo
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            value={0}
            type="radio"
            name={nameInput}
            onChange={handleChange}
            checked={checkvalue == 0}
            id={`${nameInput}_inactive`}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor={`${nameInput}_inactive`}>
            Inactivo
          </label>
        </div>
      </div>
    </>
  )
}

export default StatusControl
