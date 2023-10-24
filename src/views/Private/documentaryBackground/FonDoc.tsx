import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { Col, Form, Row } from "react-bootstrap"
import { useAppSelector } from "../../../hooks"
import { useFormik } from "formik"
import { FormDocSchema } from "../../../helpers"

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
      <Row>
        <Col lg={8} className="offset-lg-2">
          <h4 className="page-title">Agregar Fondo Documental</h4>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="offset-lg-2">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-2" controlId="fondoc_abrevi">
              <Form.Label>
                Abreviatura <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="fondoc_abrevi"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fondoc_abrevi}
                isInvalid={Boolean(formik.errors.fondoc_abrevi)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.fondoc_abrevi}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2" controlId="fondoc_nombre">
              <Form.Label>
                Nombre <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                onBlur={formik.handleBlur("fondoc_nombre")}
                name="fondoc_nombre"
                onChange={formik.handleChange}
                value={formik.values.fondoc_nombre}
                isInvalid={Boolean(formik.errors.fondoc_nombre)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.fondoc_nombre}
              </Form.Control.Feedback>
            </Form.Group>

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
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default memo(FonDoc)
