import { memo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { useFormik } from "formik"
import { ButtonSave, InputControl } from "../../../components/iu"
import { clean_fondoc_form } from "../../../reducers/fondoc"
// import { FormDocSchema } from "../../../validation"

const FonDoc = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  const { fondoc_state } = useAppSelector((state) => state.fondoc)

  useEffect(() => {
    return () => {
      dispatch(clean_fondoc_form())
    }
  }, [dispatch])

  const formik = useFormik({
    enableReinitialize: true,
    // validationSchema: FormDocSchema,
    initialValues: fondoc_state,
    onSubmit: console.log,
    validateOnChange: false,
  })

  return (
    <>
      <div>
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title">
            {formik.values.fondoc_fondoc === 0 ? "Agregar" : "Actualizar"} Fondo
            Documental
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-2">
              <InputControl
                required
                titleLabel="Abreviatura"
                nameInput={"fondoc_abrevi"}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                value={formik.values.fondoc_abrevi}
                classInvalid={formik.errors.fondoc_abrevi}
              />
            </div>

            <div className="form-group mb-2">
              <InputControl
                required
                titleLabel="Nombre"
                nameInput={"fondoc_nombre"}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                value={formik.values.fondoc_nombre}
                classInvalid={formik.errors.fondoc_nombre}
              />
            </div>

            <ButtonSave
              titleSaveButton={`${
                formik.values.fondoc_fondoc === 0 ? "CREAR" : "Actualizar"
              } Fondo Documental`}
              disabled={false}
              handleBack={handleBack}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default memo(FonDoc)
