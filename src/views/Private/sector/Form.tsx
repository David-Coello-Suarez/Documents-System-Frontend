import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { clean_form_sector } from "../../../reducers/sector"
import { isector } from "../../../interfaces"
import { post_sector, put_sector } from "../../../controllers/sector"
import { useFormik } from "formik"
import { InputControl } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"
import { SectorSchema } from "../../../validation"
import { LocaliActive } from "../../../components/uiBoxSelect"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loadin_loadin, sector_sector } = useAppSelector(
    (state) => state.sector,
  )

  useEffect(() => {
    return () => {
      dispatch(clean_form_sector())
    }
  }, [dispatch])

  const handleSave = (body: isector) => {
    if (body.sector_sector === 0) {
      dispatch(post_sector({ navigate, body }))
    } else {
      dispatch(put_sector({ body, navigate }))
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
    initialValues: sector_sector,
    validationSchema: SectorSchema,
    onSubmit: handleSave,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {values.sector_sector === 0 ? "Añadir Nueva" : "Actualizar"} Sector
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
            </div>

            <InputControl
              required
              handleBlur={handleBlur}
              nameInput={"sector_nombre"}
              handleChange={handleChange}
              value={values.sector_nombre}
              titleLabel="Descripción Sector"
              classInvalid={errors.sector_nombre}
            />

            <ButtonSave
              titleSaveButton={`${
                values.sector_sector === 0 ? "CREAR" : "Actualizar"
              } sector`}
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
