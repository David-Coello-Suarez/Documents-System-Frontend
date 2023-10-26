import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../hooks"
import { useFormik } from "formik"
import { FormDocSchema } from "../../../validation"

const FonDoc = () => {
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  const { fondoc_state } = useAppSelector((state) => state.fondoc)

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: FormDocSchema,
    initialValues: fondoc_state,
    onSubmit: console.log,
    validateOnChange: false,
  })

  return (
    <>
      <div>
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title">Agregar Fondo Documental</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-2">
              <label>
                Abreviatura <span className="text-danger">*</span>
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                name="fondoc_abrevi"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fondoc_abrevi}
                // isInvalid={Boolean(formik.errors.fondoc_abrevi)}
              />
              {/* <Form.Control.Feedback type="invalid">
                {formik.errors.fondoc_abrevi}
              </Form.Control.Feedback> */}
            </div>

            <div className="form-group mb-2">
              <label>
                Nombre <span className="text-danger">*</span>
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                onBlur={formik.handleBlur("fondoc_nombre")}
                name="fondoc_nombre"
                onChange={formik.handleChange}
                value={formik.values.fondoc_nombre}
                // isInvalid={Boolean(formik.errors.fondoc_nombre)}
              />
              {/* <Form.Control.Feedback type="invalid">
                {formik.errors.fondoc_nombre}
              </Form.Control.Feedback> */}
            </div>

            <div className="mt-2 text-center">
              <button
                type="submit"
                disabled={false}
                className="btn btn-primary btn-rounded me-md-2 mb-2 mb-md-0"
              >
                Crear Fondo Documental
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-light btn-rounded"
              >
                Regresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default memo(FonDoc)
