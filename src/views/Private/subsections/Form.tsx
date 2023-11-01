import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_subsec } from "../../../reducers/subsec"
import { SubsecSchema } from "../../../validation"
import InputControl from "../../../components/views/InputControl"
import { ButtonSave } from "../../../components/iu"
import { FondocActive, SeccioActive } from "../../../components/uiBoxSelect/"
import { isubsec } from "../../../interfaces"
import { post_subsec, put_subsec } from "../../../controllers/subsec"

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

  const handleSave = (body: isubsec) => {
    const data = { body, navigate }

    if (body.subsec_subsec === 0) {
      dispatch(post_subsec(data))
    } else {
      dispatch(put_subsec(data))
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
    initialValues: subsec_subsec,
    validationSchema: SubsecSchema,
    validateOnChange: false,
    onSubmit: handleSave,
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
            <div className="row">
              <div className="col-md-6">
                <FondocActive
                  nameSelect={"fondoc_fondoc"}
                  handleChange={(fondoc) =>
                    setFieldValue("fondoc_fondoc", fondoc)
                  }
                  value={values.fondoc_fondoc}
                  displayLabel={"Fondo Documental"}
                  classInvalid={errors.fondoc_fondoc}
                />
              </div>
              <div className="col-md-6">
                <SeccioActive
                  displayLabel={"Sección"}
                  nameSelect={"seccio_seccio"}
                  value={values.seccio_seccio}
                  classInvalid={errors.seccio_seccio}
                  refreshValue={values.fondoc_fondoc}
                  handleChange={(seccio) =>
                    setFieldValue("seccio_seccio", seccio)
                  }
                />
              </div>
            </div>

            <InputControl
              required
              titleLabel="Nombre subsección"
              nameInput={"subsec_nombre"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.subsec_nombre}
              classInvalid={errors.subsec_nombre}
            />

            <ButtonSave
              titleSaveButton={`${
                values.subsec_subsec === 0 ? "CREAR" : "Actualizar"
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
