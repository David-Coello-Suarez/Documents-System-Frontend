import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import moment from "moment"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { ButtonSave, InputControl } from "@/components/iu"
import { Perfil } from "@/components/views"
import { UsuariShema } from "@/helpers/index"
import { iusuari } from "@/interfaces/index"
import { SaveUsuari, UpdateUsuari } from "@/controllers/usuari"

const FormUsuari = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { usuari_form } = useAppSelector((state) => state.usuari)

  const operationUsuari = (usuari: iusuari) => {
    const data = { usuari, navigate }

    if (usuari.usuari_usuari == 0) {
      dispatch(SaveUsuari(data))
    } else {
      dispatch(UpdateUsuari(data))
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: usuari_form,
    validationSchema: UsuariShema,
    validateOnChange: false,
    onSubmit: operationUsuari,
  })

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) =>
    formik.setFieldValue("usuari_perfil", event.currentTarget.value)

  const handleBack = () => {
    navigate(-1)
  }
  // console.log(formik.values)
  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title">
            <strong>Añadir Usuario</strong>
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <InputControl
                  required
                  nameInput={"usuari_nomape"}
                  titleLabel="Apellidos y nombres"
                  handleChange={formik.handleChange}
                  value={formik.values.usuari_nomape}
                  classInvalid={Boolean(formik.errors.usuari_nomape)}
                />
              </div>

              <div className="col-sm-6">
                <InputControl
                  required
                  nameInput={"usuari_nomusu"}
                  titleLabel="Nombre de usuario"
                  handleChange={formik.handleChange}
                  value={formik.values.usuari_nomusu}
                  classInvalid={Boolean(formik.errors.usuari_nomusu)}
                />
              </div>

              <div className="col-sm-6">
                <InputControl
                  required
                  nameInput={"usuari_correo"}
                  titleLabel="Correo electrónico"
                  handleChange={formik.handleChange}
                  value={formik.values.usuari_correo}
                  classInvalid={Boolean(formik.errors.usuari_correo)}
                />
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label>Fecha de registro</label>
                  <div className="cal-icon">
                    <input
                      className="form-control"
                      type="date"
                      readOnly
                      value={moment().format("YYYY-MM-DD")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="display-block">
                    Estado <span className="text-danger">*</span>
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usuari_codest"
                      id="usuari_codest_active"
                      onChange={formik.handleChange}
                      value={1}
                      checked={Number(formik.values.usuari_codest) === 1}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="usuari_codest_active"
                    >
                      Activo
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usuari_codest"
                      id="usuari_codest_inactive"
                      onChange={formik.handleChange}
                      value={0}
                      checked={Number(formik.values.usuari_codest) === 0}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="usuari_codest_inactive"
                    >
                      Inactivo
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <Perfil
                  isInvalid={Boolean(formik.errors.usuari_perfil)}
                  nameInput="usuari_perfil"
                  onchangeclick={handleSelect}
                  value={formik.values.usuari_perfil}
                />
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="usuari_tipaut">
                    Tipo Autenticación <span className="text-danger">*</span>
                  </label>

                  <select
                    name="usuari_tipaut"
                    id="usuari_tipaut"
                    onChange={formik.handleChange}
                    value={formik.values.usuari_tipaut}
                    className={`form-control ${
                      formik.errors.usuari_tipaut && "is-invalid"
                    }`}
                  >
                    <option value={0}>Documents</option>
                    <option value={1}>Active Directory</option>
                  </select>
                </div>
              </div>
            </div>
            <ButtonSave
              titleSaveButton="CREAR USUARIO"
              disabled={false}
              handleBack={handleBack}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default FormUsuari
