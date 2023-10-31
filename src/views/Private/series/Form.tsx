import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_series } from "../../../reducers/series"
import { SeriesSchema } from "../../../validation"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, series_series } = useAppSelector(
    (state) => state.series,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_series())
    }
  }, [dispatch])

  const handleBack = () => navigate(-1)

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: series_series,
    validationSchema: SeriesSchema,
    validateOnChange: false,
    onSubmit: console.log,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.series_series === 0 ? "Añadir Nueva" : "Actualizar"} Serie
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="">Fondo Documental</label>
                  <select name="" id="" className="form-control"></select>
                </div>
              </div>
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="">Secciones</label>
                  <select name="" id="" className="form-control"></select>
                </div>
              </div>
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="">Sub Secciones</label>
                  <select name="" id="" className="form-control"></select>
                </div>
              </div>
            </div>

            <InputControl
              required
              titleLabel="Nombre serie"
              nameInput={"series_nombre"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.series_nombre}
              classInvalid={errors.series_nombre}
            />

            <InputControl
              required
              titleLabel="Abreviatura serie"
              nameInput={"series_abrevv"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.series_abrevv}
              classInvalid={errors.series_abrevv}
            />

            <ButtonSave
              titleSaveButton={`${
                values.sectio_sectio === 0 ? "CREAR" : "Actualizar"
              } serie`}
              disabled={loadin_loadin}
              handleBack={handleBack}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default Form
