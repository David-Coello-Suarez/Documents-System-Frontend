import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_subsec } from "../../../reducers/subsec"
import { SubsecSchema } from "../../../validation"
import InputControl from "../../../components/views/InputControl"
import { ButtonSave } from "../../../components/iu"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, subsec_subsec } = useAppSelector(
    (state) => state.subsec,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_subsec())
    }
  }, [dispatch])

  const handleBack = () => navigate(-1)

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: subsec_subsec,
    validationSchema: SubsecSchema,
    validateOnChange: false,
    onSubmit: console.log,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.subsec_subsec === 0 ? "Añadir Nueva" : "Actualizar"}{" "}
            Subsección
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit}>
            {/* <FonDocActive
              nameSelect={"fondoc_fondoc"}
              handleChange={console.log}
              value={0}
              displayLabel={"Fondo Documental"}
              classInvalid={errors.fondoc_fondoc}
            /> */}

            <InputControl
              required
              titleLabel="Nombre subsección"
              nameInput={"subsec_nombre"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.subsec_nombre}
              classInvalid={errors.subsec_nombre}
            />

            <InputControl
              required
              titleLabel="Abreviatura subsección"
              nameInput={"subsec_abrevv"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.subsec_abrevv}
              classInvalid={errors.subsec_abrevv}
            />

            <ButtonSave
              titleSaveButton={`${
                values.sectio_sectio === 0 ? "CREAR" : "Actualizar"
              } Subsección`}
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
