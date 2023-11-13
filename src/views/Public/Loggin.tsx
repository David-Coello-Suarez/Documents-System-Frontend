import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { iusuari } from "../../interfaces"
import { post_loggin } from "../../controllers/loggin"
import { InputControl } from "../../components/ui"

const Loggin = () => {
  const dispatch = useAppDispatch()
  const { forusu } = useAppSelector((state) => state.loggin)

  const validationSchema = yup.object<iusuari>().shape({
    nombreusuario: yup.string().required("Nombre usuario es requerido"),
    contrasena: yup.string().required("Contraseña es requerido"),
  })

  const loggin_api = (formusuario: {
    nombreusuario: string
    contrasena: string
  }) => dispatch(post_loggin(formusuario))

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: forusu,
    validationSchema,
    validateOnChange: false,
    onSubmit: loggin_api,
  })

  return (
    <>
      <form className="form-signin" onSubmit={formik.handleSubmit}>
        <div className="account-logo">
          <Link to={"/"}>
            <img src="assets/img/logo.png" />
          </Link>
        </div>

        <div className="row">
          <div className="col-md-12 m-b-10">
            <InputControl
              required
              nameInput="nombreusuario"
              titleLabel="Nombre de usuario"
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              value={formik.values.nombreusuario}
              classInvalid={formik.errors.nombreusuario}
            />
          </div>
          <div className="col-md-12 m-b-20">
            <InputControl
              required
              nameInput="contrasena"
              titleLabel="Contraseña"
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              value={formik.values.contrasena}
              classInvalid={formik.errors.contrasena}
            />
          </div>
        </div>
        {/* <div className="form-group text-right">
          <a href="forgot-password.html">Forgot your password?</a>
        </div> */}
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary account-btn">
            Ingresar
          </button>
        </div>
        {/* <div className="text-center register-link">
          Don’t have an account? <a href="register.html">Register Now</a>
        </div> */}
      </form>
    </>
  )
}

export default Loggin
