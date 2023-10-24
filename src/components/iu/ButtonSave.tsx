import { memo } from "react"

interface ibuttonsave {
  disabled: boolean
  handleBack: () => void
  titleSaveButton: string
}

const ButtonSave = ({ disabled, titleSaveButton, handleBack }: ibuttonsave) => {
  return (
    <div className="mt-2 text-center">
      <button
        type="submit"
        disabled={disabled}
        className="btn btn-primary btn-rounded me-md-2 mb-2 mb-md-0"
      >
        {titleSaveButton}
      </button>
      <button
        type="button"
        onClick={handleBack}
        className="btn btn-light btn-rounded"
      >
        Regresar
      </button>
    </div>
  )
}

export default memo(ButtonSave)
