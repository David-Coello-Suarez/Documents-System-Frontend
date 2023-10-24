import { memo } from "react"

interface ibuttonaction {
  handleEdit: () => void
  handleDelete?: () => void
}

const ButtonAction = ({ handleEdit, handleDelete }: ibuttonaction) => {
  return (
    <div className="d-inline-flex gap-1">
      <button className="btn-outline-success btn-sm" onClick={handleEdit}>
        <i className="fa fa-pencil"></i>
      </button>
      <button className="btn-outline-danger btn-sm" onClick={handleDelete}>
        <i className="fa fa-trash"></i>
      </button>
    </div>
  )
}

export default memo(ButtonAction)
