import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_locali } from "../../../reducers/locali"
import { ilocali } from "../../../interfaces"
import { post_locali, put_locali } from "../../../controllers/locali"
import { useFormik } from "formik"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"
import { LocaliSchema } from "../../../validation"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, locali_locali } = useAppSelector(
    (state) => state.locali,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_locali())
    }
  }, [dispatch])

  const handleSave = (body: ilocali) => {
    if (body.locali_locali === 0) {
      dispatch(post_locali({ navigate, body }))
    } else {
      dispatch(put_locali({ body, navigate }))
    }
  }

  const handleBack = () => navigate(-1)

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: locali_locali,
    validationSchema: LocaliSchema,
    validateOnChange: false,
    onSubmit: handleSave,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.locali_locali === 0 ? "Añadir Nueva" : "Actualizar"}{" "}
            Localidad
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit}>
            <InputControl
              required
              titleLabel="Descripción Localidad"
              nameInput={"locali_descri"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.locali_descri}
              classInvalid={errors.locali_descri}
            />

            <ButtonSave
              titleSaveButton={`${
                values.locali_locali === 0 ? "CREAR" : "Actualizar"
              } Localidad`}
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
