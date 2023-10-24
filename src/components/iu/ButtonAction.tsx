import { memo } from "react"
import { Button } from "react-bootstrap"

interface ibuttonaction {
  handleEdit: () => void
  handleDelete?: () => void
}

const ButtonAction = ({ handleEdit, handleDelete }: ibuttonaction) => {
  return (
    <div className="d-inline-flex gap-1">
      <Button variant="outline-success" size="sm" onClick={handleEdit}>
        <i className="fa fa-pencil"></i>
      </Button>
      <Button variant="outline-danger" size="sm" onClick={handleDelete}>
        <i className="fa fa-trash"></i>
      </Button>
    </div>
  )
}

export default memo(ButtonAction)
