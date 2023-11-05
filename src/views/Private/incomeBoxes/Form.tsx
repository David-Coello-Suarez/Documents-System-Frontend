import { useEffect } from "react"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { IngcajSchema } from "../../../validation"
import { clean_form_ingcaj } from "../../../reducers/ingcaj"
import { post_ingcaj, put_ingcaj } from "../../../controllers/ingcaj"
import ForDeIt from "./ForDeIt"
import ForInCaj from "./ForInCaj"
import InCaDe from "./InCaDe"
import { iingcaj } from "../../../interfaces"

const Form = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(clean_form_ingcaj())
    }
  }, [dispatch])

  const { incaj_ingcaj } = useAppSelector((state) => state.ingcaj)

  const handleSave = (body: iingcaj) => {
    console.log(body)
    if (body.ingcaj_ingcaj === 0) {
      dispatch(post_ingcaj({ body }))
    } else {
      dispatch(put_ingcaj({ body }))
    }
  }

  const { errors, values, setFieldValue, handleSubmit, handleChange } =
    useFormik({
      enableReinitialize: true,
      initialValues: incaj_ingcaj,
      validationSchema: IngcajSchema,
      onSubmit: handleSave,
    })
    
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <ForInCaj
              errors={errors}
              values={values}
              handleChange={handleChange}
            />
          </div>

          <div className="col-md">
            <ForDeIt
              errors={errors}
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-md-12">
          <InCaDe />
        </div>
      </div>
    </>
  )
}

export default Form
