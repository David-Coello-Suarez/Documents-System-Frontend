import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { UbicacSchema } from "../../../validation"
import { clean_form_ubicac } from "../../../reducers/ubicac"
import { post_ubicac, put_ubicac } from "../../../controllers/ubicac"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"
import {
  LocaliActive,
  SectorActive,
  SubsctActive,
} from "../../../components/uiBoxSelect"
import { iubicac } from "../../../interfaces"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, ubicac_ubicac } = useAppSelector(
    (state) => state.ubicac,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_ubicac())
    }
  }, [dispatch])

  const handleSave = (body: iubicac) => {
    if (body.ubicac_ubicac === 0) {
      dispatch(post_ubicac({ navigate, body }))
    } else {
      dispatch(put_ubicac({ body, navigate }))
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
    initialValues: ubicac_ubicac,
    validationSchema: UbicacSchema,
    onSubmit: handleSave,
  })
  
  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.ubicac_ubicac === 0 ? "Añadir Nueva" : "Actualizar"}{" "}
            Ubicación
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md">
                <LocaliActive
                  displayLabel={"Localidad"}
                  nameSelect={"locali_locali"}
                  value={values.locali_locali}
                  classInvalid={errors.locali_locali}
                  handleChange={(x) => setFieldValue("locali_locali", x)}
                />
              </div>
              <div className="col-md">
                <SectorActive
                  displayLabel={"Sector"}
                  nameSelect={"sector_sector"}
                  value={values.sector_sector}
                  classInvalid={errors.sector_sector}
                  refreshValue={values.locali_locali}
                  handleChange={(x) => setFieldValue("sector_sector", x)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 offset-md-3">
                <SubsctActive
                  displayLabel={"Sub Sector"}
                  nameSelect={"subsct_subsct"}
                  value={values.subsct_subsct}
                  classInvalid={errors.subsct_subsct}
                  refreshValue={values.sector_sector}
                  handleChange={(x) => setFieldValue("subsct_subsct", x)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md">
                <InputControl
                  required
                  titleLabel="Ubicación"
                  handleBlur={handleBlur}
                  nameInput={"ubicac_descri"}
                  handleChange={handleChange}
                  value={values.ubicac_descri}
                  classInvalid={errors.ubicac_descri}
                />
              </div>
              <div className="col-md">
                <InputControl
                  required
                  handleBlur={handleBlur}
                  nameInput={"ubicac_numdiv"}
                  handleChange={handleChange}
                  value={String(values.ubicac_numdiv)}
                  titleLabel="N°. Division"
                  classInvalid={errors.ubicac_numdiv}
                />
              </div>
            </div>

            <ButtonSave
              titleSaveButton={`${
                values.ubicac_ubicac === 0 ? "CREAR" : "Actualizar"
              } ubicación`}
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
