import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../../hooks"
import { useFormik } from "formik"
import { ProfilSchema } from "../../../../helpers"
import { AddButton, ButtonSave } from "../../../../components/iu"

const FormProfile = () => {
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  const { perfil_state } = useAppSelector((state) => state.perfil)

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: ProfilSchema,
    initialValues: perfil_state,
    onSubmit: console.log,
    validateOnChange: false,
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <AddButton titleWindows="Añadir Perfil" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form>
            <div className="form-group mb-2">
              <label>
                Nombre Perfil <span className="text-danger">*</span>
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                name="profil_nampro"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.profil_nampro}
                // isInvalid={Boolean(formik.errors.profil_nampro)}
              />
              {/* <input.Feedback type="invalid">
                {formik.errors.profil_nampro}
              </input.Feedback> */}
            </div>

            <div className="form-group mb-2">
              <label>
                Abreviatura Perfil <span className="text-danger">*</span>
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                name="profil_abbrev"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.profil_abbrev}
                // isInvalid={Boolean(formik.errors.profil_abbrev)}
              />
              {/* <input.Feedback type="invalid">
                {formik.errors.profil_abbrev}
              </input.Feedback> */}
            </div>

            <ButtonSave
              disabled={false}
              handleBack={handleBack}
              titleSaveButton="Guardar perfil"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default FormProfile
