import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_subser } from "../../../reducers/subser"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"
import { SubserSchema } from "../../../validation"
import {
  FondocActive,
  SeccioActive,
  SeriexActive,
  SubsecActive,
} from "../../../components/uiBoxSelect"
import { isubser } from "../../../interfaces"
import { post_subser, put_subser } from "../../../controllers/subser"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, subser_subser } = useAppSelector(
    (state) => state.subser,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_subser())
    }
  }, [dispatch])

  const handleSave = (body: isubser) => {
    if (body.subser_subser === 0) {
      dispatch(post_subser({ navigate, body }))
    } else {
      dispatch(put_subser({ body, navigate }))
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
    initialValues: subser_subser,
    validationSchema: SubserSchema,
    validateOnChange: false,
    onSubmit: handleSave,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.subser_subser === 0 ? "Añadir Nueva" : "Actualizar"} Sub
            Serie
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md">
                <FondocActive
                  nameSelect="fondoc_fondoc"
                  value={values.fondoc_fondoc}
                  displayLabel="Fondo Documental"
                  classInvalid={errors.fondoc_fondoc}
                  handleChange={(fondoc) =>
                    setFieldValue("fondoc_fondoc", fondoc)
                  }
                />
              </div>
              <div className="col-md">
                <SeccioActive
                  displayLabel="Sección"
                  nameSelect="seccio_seccio"
                  value={values.seccio_seccio}
                  refreshValue={values.fondoc_fondoc}
                  classInvalid={errors.seccio_seccio}
                  handleChange={(seccion) =>
                    setFieldValue("seccio_seccio", seccion)
                  }
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md">
                <SubsecActive
                  displayLabel="Sub Sección"
                  nameSelect="subsec_subsec"
                  value={values.subsec_subsec}
                  refreshValue={values.seccio_seccio}
                  classInvalid={errors.subsec_subsec}
                  handleChange={(subsec) =>
                    setFieldValue("subsec_subsec", subsec)
                  }
                />
              </div>
              <div className="col-md">
                <SeriexActive
                  displayLabel="Serie"
                  nameSelect="seriex_seriex"
                  value={values.seriex_seriex}
                  refreshValue={values.subsec_subsec}
                  classInvalid={errors.seriex_seriex}
                  handleChange={(seriex) =>
                    setFieldValue("seriex_seriex", seriex)
                  }
                />
              </div>
            </div>

            <InputControl
              required
              titleLabel="Nombre sub serie"
              nameInput={"subser_nombre"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.subser_nombre}
              classInvalid={errors.subser_nombre}
            />

            <ButtonSave
              titleSaveButton={`${
                values.subser_subser === 0 ? "CREAR" : "Actualizar"
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
