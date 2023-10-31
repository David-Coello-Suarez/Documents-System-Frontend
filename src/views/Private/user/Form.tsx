import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { post_usuari, put_usuari } from "../../../controllers/usuari"
import { iusuari } from "../../../interfaces"
import { useFormik } from "formik"
import moment from "moment"
import { useEffect } from "react"
import { clean_form_usuari } from "../../../reducers/usuari"
import { UsuarioSchema } from "../../../validation"
import { InputControl, Perfil } from "../../../components/views"
import { ButtonSave } from "../../../components/iu"

const Form = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { usuari_form, usuari_loadin } = useAppSelector((state) => state.usuari)

  const operationUsuari = (usuari: iusuari) => {
    const data = { body: usuari, navigate }

    if (usuari.usuari_usuari == 0) {
      dispatch(post_usuari(data))
    } else {
      dispatch(put_usuari(data))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clean_form_usuari())
    }
  }, [dispatch])

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setFieldValue("usuari_idperf", event.currentTarget.value)

  const handleBack = () => navigate(-1)

  const { errors, values, setFieldValue, handleSubmit, handleChange } =
    useFormik({
      enableReinitialize: true,
      initialValues: usuari_form,
      validationSchema: UsuarioSchema,
      onSubmit: operationUsuari,
    })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title">
            <strong>{`${
              values.usuari_usuari == 0 ? "NUEVO" : "ACTUALIZAR"
            } USUARIO`}</strong>
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <InputControl
                  required
                  nameInput={"usuari_nomape"}
                  titleLabel="Apellidos y nombres"
                  handleChange={handleChange}
                  value={values.usuari_nomape}
                  classInvalid={errors.usuari_nomape}
                />
              </div>

              <div className="col-sm-6">
                <InputControl
                  required
                  nameInput={"usuari_nomusu"}
                  titleLabel="Nombre de usuario"
                  handleChange={handleChange}
                  value={values.usuari_nomusu}
                  classInvalid={errors.usuari_nomusu}
                />
              </div>

              <div className="col-sm-6">
                <InputControl
                  required
                  nameInput={"usuari_correo"}
                  titleLabel="Correo electrónico"
                  handleChange={handleChange}
                  value={values.usuari_correo}
                  classInvalid={errors.usuari_correo}
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
                      name="usuari_estado"
                      id="usuari_estado_active"
                      onChange={handleChange}
                      value={1}
                      checked={Number(values.usuari_estado) === 1}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="usuari_estado_active"
                    >
                      Activo
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usuari_estado"
                      id="usuari_estado_inactive"
                      onChange={handleChange}
                      value={0}
                      checked={Number(values.usuari_estado) === 0}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="usuari_estado_inactive"
                    >
                      Inactivo
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <Perfil
                  isInvalid={errors.usuari_idperf}
                  nameInput="usuari_idperf"
                  onchangeclick={handleSelect}
                  value={values.usuari_idperf}
                />
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="usuari_idtiau">
                    Tipo Autenticación <span className="text-danger">*</span>
                  </label>

                  <select
                    name="usuari_idtiau"
                    id="usuari_idtiau"
                    onChange={handleChange}
                    value={values.usuari_idtiau}
                    defaultValue={"0"}
                    className={`form-control ${
                      errors.usuari_idtiau && "is-invalid"
                    }`}
                  >
                    <option value={0}>Documents</option>
                    <option value={1}>Active Directory</option>
                  </select>
                </div>
              </div>
            </div>
            <ButtonSave
              titleSaveButton={`${
                values.usuari_usuari == 0 ? "NUEVO" : "ACTUALIZAR"
              } USUARIO`}
              disabled={usuari_loadin}
              handleBack={handleBack}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default Form
