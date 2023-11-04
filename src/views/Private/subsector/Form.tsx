import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_subsct } from "../../../reducers/subsct"
import { isubsct } from "../../../interfaces"
import { post_subsct, put_subsct } from "../../../controllers/subsct"
import { useFormik } from "formik"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"
import { SubsctSchema } from "../../../validation"
import { LocaliActive, SectorActive } from "../../../components/uiBoxSelect"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, subsct_subsct } = useAppSelector(
    (state) => state.subsct,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_subsct())
    }
  }, [dispatch])

  const handleSave = (body: isubsct) => {
    if (body.subsct_subsct === 0) {
      dispatch(post_subsct({ navigate, body }))
    } else {
      dispatch(put_subsct({ body, navigate }))
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
    initialValues: subsct_subsct,
    validationSchema: SubsctSchema,
    onSubmit: handleSave,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.subsct_subsct === 0 ? "Añadir Nueva" : "Actualizar"} Sub
            sector
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

            <InputControl
              required
              handleBlur={handleBlur}
              nameInput={"subsct_nombre"}
              handleChange={handleChange}
              value={values.subsct_nombre}
              titleLabel="Descripción Sector"
              classInvalid={errors.subsct_nombre}
            />

            <ButtonSave
              titleSaveButton={`${
                values.subsct_subsct === 0 ? "CREAR" : "Actualizar"
              } sub sector`}
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
