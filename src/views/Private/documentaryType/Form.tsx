import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { TipdocSchema } from "../../../validation"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_tipdoc } from "../../../reducers/tipdoc"
import { post_tipdoc, put_tipdoc } from "../../../controllers/tipdoc"
import { itipdoc } from "../../../interfaces"
import { ButtonSave } from "../../../components/iu"
import { InputControl } from "../../../components/views"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, tipdoc_tipdoc } = useAppSelector(
    (state) => state.tipdoc,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_tipdoc())
    }
  }, [dispatch])

  const handleSave = (body: itipdoc) => {
    if (body.tipdoc_tipdoc === 0) {
      dispatch(post_tipdoc({ navigate, body }))
    } else {
      dispatch(put_tipdoc({ body, navigate }))
    }
  }

  const handleBack = () => navigate(-1)

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: tipdoc_tipdoc,
    validationSchema: TipdocSchema,
    onSubmit: handleSave,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.tipdoc_tipdoc === 0 ? "Añadir Nueva" : "Actualizar"} Tipo
            Doc.
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit}>
            <InputControl
              required
              handleBlur={handleBlur}
              nameInput={"tipdoc_descri"}
              handleChange={handleChange}
              value={values.tipdoc_descri}
              titleLabel="Descripción Tipo Doc."
              classInvalid={errors.tipdoc_descri}
            />

            <InputControl
              required
              handleBlur={handleBlur}
              nameInput={"tipdoc_numcon"}
              handleChange={handleChange}
              value={values.tipdoc_numcon}
              titleLabel="Número Conservación"
              classInvalid={errors.tipdoc_numcon}
            />

            <ButtonSave
              titleSaveButton={`${
                values.tipdoc_tipdoc === 0 ? "CREAR" : "Actualizar"
              } Tipo Doc.`}
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
