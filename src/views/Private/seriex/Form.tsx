import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_seriex } from "../../../reducers/seriex"
import { SeriexSchema } from "../../../validation"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"
import {
  FondocActive,
  SeccioActive,
  SubsecActive,
} from "../../../components/uiBoxSelect"
import { iseriex } from "../../../interfaces"
import { post_seriex, put_seriex } from "../../../controllers/seriex"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, sereix_seriex } = useAppSelector(
    (state) => state.seriex,
  )

  const handleSave = (body: iseriex) => {
    if (body.seriex_seriex == 0) {
      dispatch(post_seriex({ body, navigate }))
    } else {
      dispatch(put_seriex({ body, navigate }))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clean_form_seriex())
    }
  }, [dispatch])

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
    initialValues: sereix_seriex,
    validationSchema: SeriexSchema,
    validateOnChange: false,
    onSubmit: handleSave,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.seriex_seriex === 0 ? "Añadir Nueva" : "Actualizar"} Serie
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
            </div>

            <InputControl
              required
              titleLabel="Abreviatura Serie"
              nameInput={"seriex_abrevi"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.seriex_abrevi}
              classInvalid={errors.seriex_abrevi}
            />

            <InputControl
              required
              handleBlur={handleBlur}
              titleLabel="Nombre Serie"
              nameInput={"seriex_nombre"}
              handleChange={handleChange}
              value={values.seriex_nombre}
              classInvalid={errors.seriex_nombre}
            />

            <ButtonSave
              titleSaveButton={`${
                values.seriex_seriex === 0 ? "CREAR" : "Actualizar"
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
