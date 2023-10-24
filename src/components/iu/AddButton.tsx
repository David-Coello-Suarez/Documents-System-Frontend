import { memo } from "react"

interface iaddbutton {
  handleClickAdd: () => void
  msgButton: string
  titleWindows: string
}

const AddButton = ({ handleClickAdd, msgButton, titleWindows }: iaddbutton) => {
  return (
    <>
      <div className="mb-3 row">
        <div className="align-self-center col-3 col-md-4">
          <h4 className="m-0 page-title">{titleWindows}</h4>
        </div>
        <div className="col-md-8 col-9 text-end">
          <button
            onClick={handleClickAdd}
            className="align-items-center btn btn-primary btn-rounded btn-sm d-inline-flex"
          >
            <i className="fa fa-plus" />
            <strong className="d-md-inline-block d-none ms-2">
              {msgButton}
            </strong>
          </button>
        </div>
      </div>
    </>
  )
}

export default memo(AddButton)
