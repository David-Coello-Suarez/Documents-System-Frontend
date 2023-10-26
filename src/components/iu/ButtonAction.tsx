import { memo } from "react"

interface ibuttonaction {
  handleEdit?: () => void
  handleDelete?: () => void
}

const ButtonAction = ({ handleEdit, handleDelete }: ibuttonaction) => {
  return (
    <div className="d-inline-flex">
      {handleEdit && (
        <button
          className={`btn btn-outline-success btn-sm ${
            handleDelete ? "mr-2" : ""
          }`}
          onClick={handleEdit}
        >
          <i className="fa fa-pencil"></i>
        </button>
      )}

      {handleDelete && (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleDelete}
        >
          <i className="fa fa-trash"></i>
        </button>
      )}
    </div>
  )
}

export default memo(ButtonAction)
