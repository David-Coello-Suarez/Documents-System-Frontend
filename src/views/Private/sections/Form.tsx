import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { SectioSchema } from "../../../validation"
import { clean_form_sectio } from "../../../reducers/sectio"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"
import FonDocActive from "./FonDocActive"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, sectio_sectio } = useAppSelector(
    (state) => state.sectio,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_sectio())
    }
  }, [dispatch])

  const handleBack = () => navigate(-1)

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: sectio_sectio,
    validationSchema: SectioSchema,
    validateOnChange: false,
    onSubmit: console.log,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.sectio_sectio === 0 ? "Añadir" : "Actualizar"} Sección
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit}>
            <FonDocActive
              nameSelect={"fondoc_fondoc"}
              handleChange={console.log}
              value={0}
              displayLabel={"Fondo Documental"}
              classInvalid={errors.fondoc_fondoc}
            />

            <InputControl
              required
              titleLabel="Nombre sección"
              nameInput={"sectio_nombre"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.sectio_nombre}
              classInvalid={errors.sectio_nombre}
            />

            <InputControl
              required
              titleLabel="Abreviatura sección"
              nameInput={"sectio_abbrev"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.sectio_abbrev}
              classInvalid={errors.sectio_abbrev}
            />

            <ButtonSave
              titleSaveButton={`${
                values.sectio_sectio === 0 ? "CREAR" : "Actualizar"
              } Sección`}
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
