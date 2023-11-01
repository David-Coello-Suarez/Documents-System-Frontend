import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { SectioSchema } from "../../../validation"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"
import FonDocActive from "./FonDocActive"
import { clean_form_seccio } from "../../../reducers/seccio"
import { iseccio } from "../../../interfaces"
import { post_seccio, put_seccio } from "../../../controllers/seccio"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, seccio_seccio } = useAppSelector(
    (state) => state.seccio,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_seccio())
    }
  }, [dispatch])

  const handleSave = (body: iseccio) => {
    const data = { body, navigate }

    if (body.seccio_seccio === 0) {
      dispatch(post_seccio(data))
    } else {
      dispatch(put_seccio(data))
    }
  }

  const handleBack = () => navigate(-1)

  const {
    errors,
    values,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: seccio_seccio,
    validationSchema: SectioSchema,
    validateOnChange: false,
    onSubmit: handleSave,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.seccio_seccio === 0 ? "Añadir" : "Actualizar"} Sección
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit}>
            <FonDocActive
              nameSelect={"fondoc_fondoc"}
              handleChange={(fondoc) => setFieldValue("fondoc_fondoc", fondoc)}
              value={values.fondoc_fondoc}
              displayLabel={"Fondo Documental"}
              classInvalid={errors.fondoc_fondoc}
            />

            <InputControl
              required
              titleLabel="Nombre sección"
              nameInput={"seccio_nombre"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.seccio_nombre}
              classInvalid={errors.seccio_nombre}
            />

            <InputControl
              required
              titleLabel="Abreviatura sección"
              nameInput={"seccio_abrevi"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.seccio_abrevi}
              classInvalid={errors.seccio_abrevi}
            />

            <ButtonSave
              titleSaveButton={`${
                values.seccio_seccio === 0 ? "CREAR" : "Actualizar"
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
