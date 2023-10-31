import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { iprofil } from "../../../interfaces"
import { post_prefil, put_perfil } from "../../../controllers/profil"
import { useFormik } from "formik"
import { clean_form_perfil } from "../../../reducers/perfil"
import { AddButton } from "../../../components/views"
import { ProfilSchema } from "../../../validation"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { perfil_state } = useAppSelector((state) => state.perfil)

  const operation_profile = (profil: iprofil) => {
    const data = { body: profil, navigate }

    if (profil.profil_profil === 0) {
      dispatch(post_prefil(data))
    } else {
      dispatch(put_perfil(data))
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: perfil_state,
    validationSchema: ProfilSchema,
    validateOnChange: false,
    onSubmit: operation_profile,
  })

  const handleBack = () => {
    navigate(-1)
    dispatch(clean_form_perfil())
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title text-uppercase">
            {formik.values.profil_profil === 0 ? "Añadir" : "Actualizar"} Perfil
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={formik.handleSubmit}>
            <InputControl
              required
              titleLabel="Abreviatura perfil"
              nameInput={"profil_abbrev"}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              value={formik.values.profil_abbrev}
              classInvalid={formik.errors.profil_abbrev}
            />

            <InputControl
              required
              titleLabel="Nombre perfil"
              nameInput={"profil_nampro"}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              value={formik.values.profil_nampro}
              classInvalid={formik.errors.profil_nampro}
            />

            <ButtonSave
              titleSaveButton={`${
                formik.values.profil_profil === 0 ? "CREAR" : "Actualizar"
              } PERFIL`}
              disabled={false}
              handleBack={handleBack}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default Form
