import { useEffect } from "react"
import { useAppDispatch } from "../../../hooks"
import ForDeIt from "./ForDeIt"
import ForInCaj from "./ForInCaj"
import { clean_form_ingcaj } from "../../../reducers/ingcaj"
import InCaDe from "./InCaDe"

const Form = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(clean_form_ingcaj())
    }
  }, [dispatch])

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <ForInCaj />
        </div>

        <div className="col-md">
          <ForDeIt />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <InCaDe />
        </div>
      </div>
    </>
  )
}

export default Form
