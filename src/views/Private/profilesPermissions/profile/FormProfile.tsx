import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../../hooks"
import { useFormik } from "formik"
import { Col, Form, Row } from "react-bootstrap"
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
      <Row>
        <Col lg={8} className="offset-lg-2">
          <AddButton titleWindows="Añadir Perfil" />
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="offset-lg-2">
          <Form>
            <Form.Group className="mb-2" controlId="profil_nampro">
              <Form.Label>
                Nombre Perfil <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="profil_nampro"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.profil_nampro}
                isInvalid={Boolean(formik.errors.profil_nampro)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.profil_nampro}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2" controlId="profil_abbrev">
              <Form.Label>
                Abreviatura Perfil <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="profil_abbrev"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.profil_abbrev}
                isInvalid={Boolean(formik.errors.profil_abbrev)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.profil_abbrev}
              </Form.Control.Feedback>
            </Form.Group>

            <ButtonSave
              disabled={false}
              handleBack={handleBack}
              titleSaveButton="Guardar perfil"
            />
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default FormProfile
