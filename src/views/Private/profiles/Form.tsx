import { ButtonSave, InputControl } from "@/components/iu"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { clean_form } from "@/reducers/usuari"
import { useFormik } from "formik"
import { iprofil } from "@/interfaces/iprofil"
import { post_profile, put_profile } from "@/controllers/profil"

const Form = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { perfil_state } = useAppSelector((state) => state.perfil)

  const operation_profile = (profil: iprofil) => {
    const data = { profil, navigate }

    if (profil.profil_profil === 0) {
      dispatch(post_profile(data))
    } else {
      dispatch(put_profile(data))
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: perfil_state,
    validateOnChange: false,
    onSubmit: operation_profile,
  })

  const handleBack = () => {
    navigate(-1)
    dispatch(clean_form())
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
              titleLabel="Nombre perfil"
              nameInput={"profil_nampro"}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              value={formik.values.profil_nampro}
              classInvalid={Boolean(formik.errors.profil_nampro)}
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
