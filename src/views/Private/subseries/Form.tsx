import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_subser } from "../../../reducers/subser"
import { SubserSchema } from "../../../validation"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, subsec_subsec } = useAppSelector(
    (state) => state.subsec,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_subser())
    }
  }, [dispatch])

  const handleBack = () => navigate(-1)

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: subsec_subsec,
    validationSchema: SubserSchema,
    validateOnChange: false,
    onSubmit: console.log,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.subsec_subsec === 0 ? "Añadir Nueva" : "Actualizar"} Sub
            Serie
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
            </div>

            <div className="row">
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="">Sub Secciones</label>
                  <select name="" id="" className="form-control"></select>
                </div>
              </div>
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="">Series</label>
                  <select name="" id="" className="form-control"></select>
                </div>
              </div>
            </div>

            <InputControl
              required
              titleLabel="Nombre sub serie"
              nameInput={"subsec_nombre"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.subsec_nombre}
              classInvalid={errors.subsec_nombre}
            />

            <ButtonSave
              titleSaveButton={`${
                values.sectio_sectio === 0 ? "CREAR" : "Actualizar"
              } sub serie`}
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
